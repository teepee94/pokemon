import React from 'react'
import { Helmet } from "react-helmet"
import Content from '../../components/Content'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentContent() {
  return (
    <>
    <Helmet>
        <title>Component: Content</title>
    </Helmet>
    <ComponentInfo title="Content" summary=" Used for generic pieces of content" />
    <Content />
    </>
  )
}

export default ComponentContent