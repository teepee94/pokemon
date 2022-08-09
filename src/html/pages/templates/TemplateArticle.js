
import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Article from '../../components/Article'

function TemplateArticle() {
    return (
        <>
        <Helmet>
            <title>Template: Blog Article</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <article>
                <Article />
            </article>
        </main>
        <Footer />
        </>
    )
}

export default TemplateArticle