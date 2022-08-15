import React from 'react'
import { Link } from "react-router-dom";
import "../../resources/sass/components/_components.masthead-home.scss"

function MastheadHome(c) {
  return (
    <div className={`c-masthead-home ${c.class ? c.class : "" }`}>
        <div className="container">
            <div className="row">
                <div className="c-masthead-home__container">
                    <h1 className="c-masthead-home__title">{c.title}</h1>
                    {c.summary ?
                        <p className="c-masthead-home__summary">{c.summary}</p> : ""}
                    {c.link ? <Link to={c.link} className="c-masthead-home__btn c-btn c-btn--primary">{c.linktext}</Link> : ""}
                </div>
                {c.image ?
                <div className="c-masthead-home__media-container">
                    <img className="c-masthead-home__media" src={c.image} width="200" alt="ash and pikachu dashiesparkle pokemon png" />
                </div> : ""}
            </div>
        </div>
    </div>
  )
}

export default MastheadHome