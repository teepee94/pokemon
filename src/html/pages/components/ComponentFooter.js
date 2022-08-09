import React from 'react'
import { Helmet } from "react-helmet"
import Footer from '../../components/Footer'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentFooter() {
    return (
        <>
        <Helmet>
            <title>Component: Footer</title>
        </Helmet>
        <ComponentInfo title="Footer" summary="Global footer at the bottom of every page" />
        <Footer />
        </>
    )
}

export default ComponentFooter