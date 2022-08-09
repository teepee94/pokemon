import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Masthead from '../../components/Masthead'

function TemplateError() {
	return (
		<>
		<Helmet>
			<title>Template: Error</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<article>
				<Masthead title="Page Error" />
			</article>
		</main>
		<Footer />
		</>
	)
}

export default TemplateError