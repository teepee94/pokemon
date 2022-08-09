import React from 'react'
import { Helmet } from "react-helmet"
import Pagination from '../../components/Pagination'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentPagination() {
    return (
        <>
        <Helmet>
            <title>Component: Pagination</title>
        </Helmet>
        <ComponentInfo title="Pagination" summary="Used on a long list of items" />
        <Pagination />
        </>
    )
}

export default ComponentPagination