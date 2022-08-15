import React from 'react'
import "../../resources/sass/components/_components.masthead.scss"

function Masthead(c) {
    return (
        <div className={`c-masthead ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-masthead__title-container">
                        <h1 className="c-masthead__title">{c.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Masthead