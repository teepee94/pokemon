import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Masthead from '../components/Masthead'
import 'firebase/compat/auth';
import Compare from '../components/Compare'

function TemplateCompare() {
	return (
		<>
		<Helmet>
			<title>Compare</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<article>
				<Masthead title="Compare" />
				<Compare />
			</article>
		</main>
		</>
	)
}

export default TemplateCompare