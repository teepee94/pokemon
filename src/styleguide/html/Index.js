import React from "react"
import "../resources/sass/styleguide.scss"

function Index(c) {
    return (
        <div className="container" style={{color: c.styleguideTextColor}}>
            <div className="row">
                <div className="style-logo">
                    <img src="/resources/images/test/logo.svg" alt=""/>
                </div>
            </div>
            <div className="row">
                <div className="style-section">
                    <h2 className="heading-h1">Styleguide</h2>
                    <ul style={{marginTop: "20px"}}>
                        <li><a href="styleguide">Styleguide</a></li>
                    </ul>
                </div>
                <div className="style-section">
                    <h2 className="heading-h1">Templates</h2>
                    <ul style={{marginTop: "20px"}}>
                        <li><a href="/template-article">Article</a></li>
                        <li><a href="/template-index">Index</a></li>
                        <li><a href="/template-error">Error</a></li>
                        <li><a href="/template-homepage">Homepage</a></li>
                    </ul>
                </div>
                <div className="style-section">
                    <h2 className="heading-h1">Components</h2>
                    <ul style={{marginTop: "20px"}}>
                        <li><a href="/component-article">Article</a></li>
                        <li><a href="/component-listing">Listing</a></li>
                        <li><a href="/component-cookiebar">Cookie Bar</a></li>
                        <li><a href="/component-footer">Footer</a></li>
                        <li><a href="/component-form">Forms</a></li>
                        <li><a href="/component-masthead">Masthead</a></li>
                        <li><a href="/component-navbar">Navbar</a></li>
                        <li><a href="/component-pagination">Pagination</a></li>
                        <li><a href="/component-profile">Profile</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="style-footer">
                    <a href="https://tommyparkinson.com"><img src="/resources/images/test/logo.svg" alt="Logo"/></a>
                </div>
            </div>
        </div>
    )
}

export default Index