import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
import Navbar from "../components/Navbar"
import Masthead from "../components/Masthead"

// Rendered for unknown URLs and for any error thrown while rendering a page.
// `inLayout` means the root layout (navbar) is already on screen.
function ErrorPage({ notFound = false, inLayout = false }) {
    const error = useRouteError()
    const is404 = notFound || (isRouteErrorResponse(error) && error.status === 404)

    if (error && !is404) console.error(error)

    const content = (
        <>
            <title>{is404 ? "Page not found · Pokédex" : "Something went wrong · Pokédex"}</title>
            <Masthead
                eyebrow={is404 ? "404" : "Error"}
                title={is404 ? "Page not found" : "Something went wrong"}
                summary={
                    is404
                        ? "That page doesn't exist. It may have moved, or the link may be wrong."
                        : "An unexpected error stopped this page from loading. Please try again."
                }
            />
            <div className="container">
                <p>
                    <Link to="/" className="c-btn c-btn--primary">
                        Back to the Pokédex
                    </Link>
                </p>
            </div>
        </>
    )

    if (inLayout) return content

    return (
        <>
            <Navbar />
            <main id="main-content">{content}</main>
        </>
    )
}

export default ErrorPage
