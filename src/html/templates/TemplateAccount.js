import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Masthead from '../components/Masthead'
import Profile from "../components/Profile"
import CompareTray from '../components/CompareTray'

function TemplateAccount() {
    return (
        <>
        <Helmet>
            <title>My Favourites · Pokédex</title>
        </Helmet>
        <Navbar />
        <main id="main-content">
            <Masthead
                eyebrow="Account"
                title="My Favourites"
                summary="Pokémon you've saved from their detail pages."
            />
            <Profile />
        </main>
        <CompareTray />
        </>
    )
}

export default TemplateAccount
