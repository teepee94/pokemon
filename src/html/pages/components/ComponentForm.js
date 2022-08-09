import React from 'react'
import { Helmet } from "react-helmet"
import Form from '../../components/Form'
import ComponentInfo from '../../includes/ComponentInfo'

function ComponentForm() {
  return (
    <>
    <Helmet>
        <title>Component: Form</title>
    </Helmet>
    <ComponentInfo title="Form" summary="Generic form layout" />
    <Form id="1" />

    <ComponentInfo title="Form" summary="With error message" />
    <Form id="2" errormessage />

    <ComponentInfo title="Form" summary="With success message" />
    <Form id="3" successmessage />
    </>
  )
}

export default ComponentForm