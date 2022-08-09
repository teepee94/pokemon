import React from "react";
import ReactDOM from "react-dom/client";

// Styleguide Pages
import Index from "./styleguide/html/Index"
import Styleguide from "./styleguide/html/Styleguide";

// Component Pages
import ComponentArticle from "./html/pages/components/ComponentArticle";
import ComponentListing from "./html/pages/components/ComponentListing";
import ComponentCookiebar from "./html/pages/components/ComponentCookiebar";
import ComponentFooter from "./html/pages/components/ComponentFooter";
import ComponentForm from "./html/pages/components/ComponentForm";
import ComponentMasthead from "./html/pages/components/ComponentMasthead";
import ComponentNavbar from "./html/pages/components/ComponentNavbar";
import ComponentPagination from "./html/pages/components/ComponentPagination";
import ComponentProfile from "./html/pages/components/ComponentProfile";

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
			<Route exact path="/" element={<Index sitename="Boilerplate" styleguideTextColor="#000000" />} />
			<Route exact path="/styleguide" element={<Styleguide styleguideTextColor="#000000" />} />
			<Route exact path="/component-article" element={<ComponentArticle />} />
			<Route exact path="/component-listing" element={<ComponentListing />} />
			<Route exact path="/component-cookiebar" element={<ComponentCookiebar />} />
			<Route exact path="/component-footer" element={<ComponentFooter />} />
			<Route exact path="/component-form" element={<ComponentForm />} />
			<Route exact path="/component-masthead" element={<ComponentMasthead />} />
			<Route exact path="/component-navbar" element={<ComponentNavbar />} />
			<Route exact path="/component-pagination" element={<ComponentPagination />} />
			<Route exact path="/component-profile" element={<ComponentProfile />} />
			<Route exact path="/template-article" element={<TemplateArticle />} />
			<Route exact path="/template-index" element={<TemplateIndex />} />
			<Route exact path="/template-error" element={<TemplateError />} />
			<Route exact path="/template-homepage" element={<TemplateHomepage />} />
		</Routes>
	</Router>
);