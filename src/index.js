import React from "react";
import ReactDOM from "react-dom/client";

// Templates
import TemplateArticle from "./html/pages/templates/TemplateArticle";
import TemplateIndex from "./html/pages/templates/TemplateIndex";
import TemplateError from "./html/pages/templates/TemplateError";
import TemplateHomepage from "./html/pages/templates/TemplateHomepage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route path="/pokemon/:name" element={<TemplateArticle />} />
			<Route exact path="/" element={<TemplateHomepage />} />
			<Route exact path="/pokemon" element={<TemplateIndex />} />
		</Routes>
	</Router>
);