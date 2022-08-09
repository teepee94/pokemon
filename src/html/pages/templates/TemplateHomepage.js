import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Masthead from '../../components/Masthead'

function TemplateHomepage() {
	return (
		<>
		<Helmet>
			<title>Homepage</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<article>
				<Masthead title="Page title would go here lorem ipsum" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a." />
			</article>
		</main>
		<Footer />
		</>
	)
}

export default TemplateHomepage