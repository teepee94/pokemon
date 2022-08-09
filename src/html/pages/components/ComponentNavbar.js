import React from "react"
import { Helmet } from "react-helmet"
import Navbar from "../../components/Navbar"
import ComponentInfo from "../../includes/ComponentInfo"

function ComponentNavbar() {
	return (
		<>
		<Helmet>
			<title>Component: Navbar</title>
		</Helmet>
		<Navbar />
		<main id="main-content">
			<article>
				<ComponentInfo title="Navbar" summary="Global header at the top of every page" />
				<div style={{height: "100vh"}}></div>
			</article>
		</main>
		</>
	)
}

export default ComponentNavbar