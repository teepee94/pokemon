import React from "react";
import ReactDOM from "react-dom/client";

// Templates
import TemplateArticle from "./html/templates/TemplateArticle";
import TemplateIndex from "./html/templates/TemplateIndex";
import TemplateAccount from "./html/templates/TemplateAccount";
import TemplateCompare from "./html/templates/TemplateCompare";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { store } from "./resources/js/redux/store"
import { Provider } from 'react-redux'
import { useAuthListener } from "./resources/js/firebase/useAuthListener";

function App() {
	useAuthListener();

	return (
		<Router>
			<Routes>
				<Route path="/pokemon/:name" element={<TemplateArticle />} />
				<Route path="/" element={<TemplateIndex />} />
				<Route path="/compare" element={<TemplateCompare />} />
				<Route path="/account" element={<TemplateAccount />} />
			</Routes>
		</Router>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
