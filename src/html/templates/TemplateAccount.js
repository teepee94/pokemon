import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Masthead from '../components/Masthead'
import Profile from "../components/Profile"

function TemplateAccount() {
    return (
        <>
        <Helmet>
            <title>Account</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <article id="js-blog-article-content">
                <Masthead title="Account" />
                <Profile />
            </article>
        </main>
        </>
    )
}

export default TemplateAccount