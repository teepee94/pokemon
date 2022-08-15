import React from "react";
import ReactDOM from "react-dom/client";

// Templates
import TemplateArticle from "./html/templates/TemplateArticle";
import TemplateIndex from "./html/templates/TemplateIndex";
// import TemplateHomepage from "./html/templates/TemplateHomepage";
import TemplateAccount from "./html/templates/TemplateAccount";
import TemplateCompare from "./html/templates/TemplateCompare";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { store } from "./resources/js/redux/store"
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/pokemon/:name" element={<TemplateArticle />} />
				<Route exact path="/" element={<TemplateIndex />} />
				<Route exact path="/pokemon" element={<TemplateIndex />} />
				<Route exact path="/compare" element={<TemplateCompare />} />
				<Route exact path="/account" element={<TemplateAccount />} />
			</Routes>
		</Router>
	</Provider>
);