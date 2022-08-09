import React from 'react'
import { Helmet } from "react-helmet"
import Cookiebar from '../../components/Cookiebar'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentCookiebar() {
    return (
        <>
        <Helmet>
            <title>Component: Cookiebar</title>
        </Helmet>
        <ComponentInfo title="Cookie Bar" summary="This will only show on the first visit to the site" />
        <Cookiebar forceshow="true" />
        </>
    )
}

export default ComponentCookiebar