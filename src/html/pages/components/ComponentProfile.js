import React from 'react'
import { Helmet } from "react-helmet"
import Profile from '../../components/Profile'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentProfile() {
    return (
        <>
        <Helmet>
            <title>Component: Profile</title>
        </Helmet>
        <ComponentInfo title="Profile" summary="A users account profile" />
        <Profile />
        </>
    )
}

export default ComponentProfile