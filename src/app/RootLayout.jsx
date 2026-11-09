import { Outlet, ScrollRestoration, useMatch } from "react-router-dom"
import Navbar from "../components/Navbar"
import CompareTray from "../components/CompareTray"
import { useAuthListener } from "../features/auth/useAuthListener"

// Shared shell for every page: one navbar, one auth subscription, and the
// compare tray everywhere except the compare page itself.
function RootLayout() {
    useAuthListener()
    const isComparePage = useMatch("/compare")

    return (
        <>
            <Navbar />
            <main id="main-content">
                <Outlet />
            </main>
            {!isComparePage && <CompareTray />}
            <ScrollRestoration />
        </>
    )
}

export default RootLayout
