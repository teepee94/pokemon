import React from 'react'
import { Helmet } from "react-helmet"
import Masthead from '../../components/Masthead'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentMasthead() {
    return (
        <>
        <Helmet>
            <title>Component: Masthead</title>
        </Helmet>
        <ComponentInfo title="Masthead" summary="Normally used as a page heading" />
        <Masthead title="Title would go here lorem ipsum" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a." />
        </>
    )
}

export default ComponentMasthead