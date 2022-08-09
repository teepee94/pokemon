import React from 'react'
import "../../resources/sass/components/_components.article.scss"

function Article(c) {    
    return (
        <div className={`c-article ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-article__header-container">
                        <h1 className="c-article__header-title">Blog article title would go here</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article