import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import "../../resources/sass/components/_components.article.scss"
import axios from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'

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
	}, [])

    return (
        <div className={`c-article ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-article__header-container">
                        <h1 className="c-article__header-title">{name}</h1>
                    </div>
                    <div className="c-article__content-container">
                        <h2>Image</h2>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${articleData.id}.png`} alt="" />
                        <h2>Experience</h2>
                        <p>{articleData.base_experience}</p>
                        <h2>Abilities</h2>
                        <ul>
                            {articleData.abilities?.map((item, index) => (
                                <li key={index}>{item.ability.name}</li>
                            ))}
                        </ul>
                        <h2>Found in these versions</h2>
                        <ul>
                            {articleData.game_indices?.map((item, index) => (
                                <li key={index}>{item.version.name}</li>
                            ))}
                        </ul>
                        <h2>Height</h2>
                        <p>{articleData.height}</p>
                        <h2>Location area encounters?</h2>
                        <h2>Moves</h2>
                        <ul>
                            {articleData.moves?.map((item, index) => (
                                <li key={index}>{item.move.name}</li>
                            ))}
                        </ul>
                        <h2>Species?</h2>
                        <h2>Sprites?</h2>
                        <h2>Stats</h2>
                        <ul>
                            {articleData.stats?.map((item, index) => (
                                <li key={index}>
                                    <p>{item.stat.name}: {item.base_stat}. Effort: {item.effort}</p>
                                </li>
                            ))}
                        </ul>
                        <h2>Types</h2>
                        <ul>
                            {articleData.types?.map((item, index) => (
                                <li key={index}>
                                    <p>{item.type.name}</p>
                                </li>
                            ))}
                        </ul>
                        <h2>Weight</h2>
                        <p>{articleData.weight}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article