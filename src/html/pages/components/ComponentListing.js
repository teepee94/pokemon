import React from 'react'
import { Helmet } from "react-helmet"
import ComponentInfo from '../../includes/ComponentInfo'
import Listing from '../../components/Listing'

function ComponentListing() {
  return (
    <>
    <Helmet>
        <title>Component: Blog Listing</title>
    </Helmet>
    <ComponentInfo title="Listing" summary="A list of articles" />
    <Listing />


    <ComponentInfo title="Listing" summary="Filtered articles" />
    <Listing filtered />
    </>
  )
}

export default ComponentListing