import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import "../../resources/sass/components/_components.article.scss"
import axios, { isCancel } from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import Masthead from "./Masthead"
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { db } from "../../resources/js/firebase/firebase"
import { selectUser } from "../../resources/js/redux/userSlice"

const FAVOURITE_LABELS = {
    idle: "Add to Favourites",
    saving: "Saving…",
    saved: "Added to Favourites",
    error: "Couldn't save, try again",
}

function Article(c) {
    const { name } = useParams();
    const user = useSelector(selectUser)

    const [articleData, setArticleData] = useState(null);
    const [error, setError] = useState(null);
    const [favouriteStatus, setFavouriteStatus] = useState("idle");

    useEffect(() => {
        const controller = new AbortController()

        // Clear the previous pokemon so its data never shows under a new name.
        setArticleData(null)
        setError(null)
        setFavouriteStatus("idle")

        axios.get(`${requests.pokemon}/${encodeURIComponent(name)}`, { signal: controller.signal })
            .then(response => setArticleData(response.data))
            .catch(err => {
                if (!isCancel(err)) setError(err)
            })

        return () => controller.abort()
    }, [name])

    const addToFavourites = async () => {
        if (!user.uid) {
            alert("Please sign in")
            return
        }

        setFavouriteStatus("saving")

        try {
            // Key the document on the name the API returned, not the raw URL
            // param, so only real pokemon can be saved.
            await setDoc(doc(db, "pokemon", user.uid, "favourites", articleData.name), {
                id: articleData.id
            })
            setFavouriteStatus("saved")
        } catch (err) {
            console.error(err)
            setFavouriteStatus("error")
        }
    }

    if (error || !articleData) {
        const isNotFound = error?.response?.status === 404

        return (
            <>
            <Masthead title={name} />
            <div className={`c-article ${c.class ? c.class : "" }`}>
                <div className="container">
                    <div className="row">
                        {error
                            ? <p role="alert">{isNotFound ? "We couldn't find that Pokémon." : "Sorry, something went wrong loading this Pokémon."}</p>
                            : <p aria-live="polite">Loading…</p>}
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
        <Masthead title={articleData.name} />
        <div className={`c-article ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-article__btn-container">
                        <button
                            onClick={addToFavourites}
                            disabled={favouriteStatus === "saving" || favouriteStatus === "saved"}
                            className="c-article__btn c-btn"
                        >
                            {FAVOURITE_LABELS[favouriteStatus]}
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="c-article__content">
                        <div className="c-article__content-wrapper">
                            <h2>Moves</h2>
                            <ul>
                                {articleData.moves.map(item => (
                                    <li key={item.move.name}>{item.move.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="c-article__content">
                        <div className="row">
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Image</h2>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${articleData.id}.png`} alt={articleData.name} />
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Weight</h2>
                                    <p>{articleData.weight}</p>
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Experience</h2>
                                    <p>{articleData.base_experience}</p>
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Abilities</h2>
                                    <ul>
                                        {articleData.abilities.map(item => (
                                            <li key={item.ability.name}>{item.ability.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Height</h2>
                                    <p>{articleData.height}</p>
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Stats</h2>
                                    <ul>
                                        {articleData.stats.map(item => (
                                            <li key={item.stat.name}>
                                                <p>{item.stat.name}: {item.base_stat}. Effort: {item.effort}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Types</h2>
                                    <ul>
                                        {articleData.types.map(item => (
                                            <li key={item.type.name}>
                                                <p>{item.type.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Article