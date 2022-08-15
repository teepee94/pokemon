import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import "../../resources/sass/components/_components.article.scss"
import axios from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import Masthead from "./Masthead"
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../resources/js/firebase/firebase"



function Article(c) {    
    const { name } = useParams();

    const [articleData, setArticleData] = useState([]);

	useEffect(() => {
		async function getArticleData() {
			const request = await axios.get(`${requests.pokemon}/${name}`);

			setArticleData(request.data);

			return request;
		}

		getArticleData();
	}, [name])

    const addToFavourties = () => {
        const user = getAuth();

        if(user.currentUser) {
            setDoc(doc(db, "pokemon", user.currentUser.uid, "favourites", name), {
                id: articleData.id
            });
        } else {
            alert("Please sign in")
        }
    }

    return (
        <>
        <Masthead title={name} />
        <div className={`c-article ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-article__btn-container">
                        <button onClick={addToFavourties} className="c-article__btn c-btn">Add to Favourites</button>
                    </div>
                </div>
                <div className="row">
                    <div className="c-article__content">
                        <div className="c-article__content-wrapper">
                            <h2>Moves</h2>
                            <ul>
                                {articleData.moves?.map((item, index) => (
                                    <li key={index}>{item.move.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="c-article__content">
                        <div className="row">
                            <div className="c-article__content-section">
                                <div className="c-article__content-wrapper">
                                    <h2>Image</h2>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${articleData.id}.png`} alt="" />
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
                                        {articleData.abilities?.map((item, index) => (
                                            <li key={index}>{item.ability.name}</li>
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
                                        {articleData.stats?.map((item, index) => (
                                            <li key={index}>
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
                                        {articleData.types?.map((item, index) => (
                                            <li key={index}>
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