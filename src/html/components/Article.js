import React from 'react'
import { useParams } from "react-router-dom";
import "../../resources/sass/components/_components.article.scss"

function Article(c) {    
    const { name } = useParams();

    return (
        <div className={`c-article ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-article__header-container">
                        <h1 className="c-article__header-title">{name}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article