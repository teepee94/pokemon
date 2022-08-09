import React from 'react'
import "../../resources/sass/components/_components.cookiebar.scss"

function Cookiebar(c) {
    return (
        <div className={`c-cookiebar ${c.class ? c.class : "" } ${c.forceshow ? "" : "c-cookiebar--hidden" }`}  id="js-cookiebar">
            <p className="c-cookiebar__text">We use cookies to give you the best experience of using this website. By continuing to use this site, you accept our use of cookies. Please read our <a href="" className="c-cookiebar__link">Cookie Policy</a> for more information.</p>
            <div className="c-cookiebar__links">
                <button className="c-btn c-btn--primary" id="js-cookiebar-confirm">Accept and Close</button>
            </div>
        </div>
    )
}

export default Cookiebar