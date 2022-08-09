import React from 'react'

function ComponentInfo(c) {
	return (
		<div style={{borderBottom: "1px solid #ccc", margin: "60px 0 30px 0", padding: "0 30px 30px 30px", textAlign: "center", width: "100%"}}>
			<h1 style={{fontSize: "50px", fontWeight: "700"}}>{c.title}</h1>
			<p>{c.summary}</p>
		</div>
	)
}

export default ComponentInfo