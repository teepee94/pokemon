import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Listing from '../../components/Listing'
import Masthead from '../../components/Masthead'
import Pagination from '../../components/Pagination'

function TemplateIndex() {
    return (
        <>
        <Helmet>
            <title>Template: Blog Index</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <article>
                <Masthead title="Blog Index" />
                <Listing />
				<Pagination />
            </article>
        </main>
        <Footer />
        </>
    )
}

export default TemplateIndex