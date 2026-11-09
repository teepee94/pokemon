import React from 'react'
import { Helmet } from "react-helmet"
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Article from '../components/Article'
import CompareTray from '../components/CompareTray'
import { formatName } from '../../resources/js/utils/format'

function TemplateArticle() {
    const { name } = useParams()

    return (
        <>
        <Helmet>
            <title>{`${formatName(name)} · Pokédex`}</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <Article />
        </main>
        <CompareTray />
        </>
    )
}

export default TemplateArticle
