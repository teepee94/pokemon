import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function TemplateAccount() {
    return (
        <>
        <Helmet>
            <title>Account</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <article id="js-blog-article-content">
                <div>Profile component would go here</div>
            </article>
        </main>
        <Footer />
        </>
    )
}

export default TemplateAccount