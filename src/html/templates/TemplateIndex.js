import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Listing from '../components/Listing'
import Masthead from '../components/Masthead'
import CompareTray from '../components/CompareTray'

function TemplateIndex() {
    return (
        <>
        <Helmet>
            <title>Pokédex</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <Masthead
                eyebrow="Pokédex"
                title="Find your Pokémon"
                summary="Browse every Pokémon, filter by generation and compare up to four side by side."
            />
            <Listing />
        </main>
        <CompareTray />
        </>
    )
}

export default TemplateIndex
