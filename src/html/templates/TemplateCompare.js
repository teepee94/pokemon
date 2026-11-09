import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import Masthead from '../components/Masthead'
import Compare from '../components/Compare'

function TemplateCompare() {
	return (
		<>
		<Helmet>
			<title>Compare · Pokédex</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<Masthead
				eyebrow="Compare"
				title="Side by side"
				summary="Stats, abilities and moves lined up in one table. The highest value in each row is highlighted."
			/>
			<Compare />
		</main>
		</>
	)
}

export default TemplateCompare
