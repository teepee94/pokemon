import React from 'react'
import { Link } from "react-router-dom";
import "../../resources/sass/components/_components.masthead.scss"

function Masthead(c) {
  return (
    <div className={`c-masthead ${c.class ? c.class : "" }`}>
        <div className="container">
            <div className="row">
                <div className="c-masthead__container">
                    <h1 className="c-masthead__title">{c.title}</h1>
                    {c.summary ?
                        <p className="c-masthead__summary">{c.summary}</p> : ""}
                    {c.link ? <Link to={c.link} className="c-masthead__btn c-btn c-btn--primary">{c.linktext}</Link> : ""}
                </div>
                {c.image ?
                <div className="c-masthead__media-container">
                    <img className="c-masthead__media" src={c.image} width="200" alt="ash and pikachu dashiesparkle pokemon png" />
                </div> : ""}
            </div>
        </div>
    </div>
  )
}

export default Masthead