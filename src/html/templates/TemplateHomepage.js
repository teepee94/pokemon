import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar'
import MastheadHome from '../components/MastheadHome'
import 'firebase/compat/auth';

function TemplateHomepage() {
	return (
		<>
		<Helmet>
			<title>Homepage</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<article>
				<MastheadHome class="c-masthead-home--media" title="Gotta Catch 'Em All!" image="https://www.freepnglogos.com/uploads/pokemon-png/ash-and-pikachu-dashiesparkle-pokemon-png-29.png" link="/pokemon" linktext="View Pokémon" summary="Pokémon is a Japanese media franchise managed by The Pokémon Company, a company founded by Nintendo, Game Freak, and Creatures." />
			</article>
		</main>
		</>
	)
}

export default TemplateHomepage