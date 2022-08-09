import React from 'react'
import { Helmet } from "react-helmet"
import ComponentInfo from '../../includes/ComponentInfo'
import Listing from '../../components/Listing'
import axios from "../../../resources/js/api/Axios"
import requests from '../../../resources/js/api/Requests'

function ComponentListing() {
  return (
    <>
    <Helmet>
        <title>Component: Listing</title>
    </Helmet>
    <ComponentInfo title="Listing" summary="A list of articles" />
    <Listing endpoint={requests.pokemon} />
    </>
  )
}

export default ComponentListing