import React from 'react'
import { Helmet } from "react-helmet"
import ComponentInfo from '../../includes/ComponentInfo'
import Article from '../../components/Article'

function ComponentArticle() {

    return (
        <>
        <Helmet>
            <title>Component: Article</title>
        </Helmet>
        <main id="main-content">
            <article>
                <ComponentInfo title="Article" summary="Article header & content" />
                <Article />
            </article>
        </main>
        </>
    )
}

export default ComponentArticle