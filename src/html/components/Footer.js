import React, { useEffect } from 'react'
import { FECookiebar } from '../../resources/js/CookiebarFE'
import Cookiebar from "../components/Cookiebar"
import "../../resources/sass/components/_components.footer.scss"

function Footer(c) {

    useEffect(() => {
        FECookiebar.Init()
    }, [])
    
    return (
        <>
        <footer className={`c-footer ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-footer__legal">
                        <p className="c-footer__copyright">© tommyparkinson 2022</p>
                    </div>
                </div>
            </div>
        </footer>
        <Cookiebar />
        </>
    )
}

export default Footer