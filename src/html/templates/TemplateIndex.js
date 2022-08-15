import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Listing from '../components/Listing'
import Masthead from '../components/Masthead'
import requests from '../../resources/js/api/Requests'

function TemplateIndex() {

    return (
        <>
        <Helmet>
            <title>Template: Blog Index</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <article>
                <Masthead title="Index" />
                <Listing endpoint={requests.pokemon} header="Filtered By:" />
            </article>
        </main>
        </>
    )
}

export default TemplateIndex