import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Listing from '../../components/Listing'
import Masthead from '../../components/Masthead'
import Pagination from '../../components/Pagination'
import requests from '../../../resources/js/api/Requests'

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
				<Pagination />
            </article>
        </main>
        <Footer />
        </>
    )
}

export default TemplateIndex