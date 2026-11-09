import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink, useLocation } from "react-router-dom"
import "../styles/components/_components.navbar.scss"
import { isPopupClosed, signInWithGoogle, signOutUser } from "../lib/firebase"
import { selectUser } from "../features/auth/userSlice"
import { selectCompare } from "../features/compare/compareSlice"

const navLinkClass = ({ isActive }) => `c-navbar__link${isActive ? " is-active" : ""}`

function Navbar() {
    const user = useSelector(selectUser)
    const compareCount = useSelector(selectCompare).length
    const { pathname } = useLocation()
    const [isSticky, setIsSticky] = useState(false)
    const [menu, setMenu] = useState({ isOpen: false, pathname })

    // Close the mobile menu after navigating. Deriving it from the pathname
    // the menu was opened on avoids an effect that resets state.
    const isMenuOpen = menu.isOpen && menu.pathname === pathname
    const setMenuOpen = (isOpen) => setMenu({ isOpen, pathname })

    useEffect(() => {
        const onScroll = () => setIsSticky(window.scrollY > 10)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        if (!isMenuOpen) return
        const onKeyDown = (event) => {
            if (event.key === "Escape") setMenu((current) => ({ ...current, isOpen: false }))
        }
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [isMenuOpen])

    // The root auth listener dispatches login/logout; these only talk to Firebase.
    const handleAuthClick = async () => {
        try {
            await (user.uid ? signOutUser() : signInWithGoogle())
        } catch (error) {
            if (!isPopupClosed(error)) console.error(error)
        }
    }

    const navClassName = ["c-navbar", isSticky && "is-sticky", isMenuOpen && "is-nav-open"]
        .filter(Boolean)
        .join(" ")

    return (
        <>
            <a href="#main-content">Skip to content</a>
            <nav className={navClassName} aria-label="Main">
                <div className="container c-navbar__container">
                    <Link to="/" className="c-navbar__brand">
                        <img src="/resources/logo.png" alt="Pokédex home" width="200" height="74" />
                    </Link>
                    <div className="c-navbar__links" id="navbar-links">
                        <ul className="c-navbar__list">
                            <li>
                                <NavLink to="/" end className={navLinkClass}>
                                    Pokédex
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/compare"
                                    className={navLinkClass}
                                    aria-label={
                                        compareCount > 0 ? `Compare, ${compareCount} selected` : undefined
                                    }
                                >
                                    Compare
                                    {compareCount > 0 && (
                                        <span className="c-navbar__badge" aria-hidden="true">
                                            {compareCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/favourites" className={navLinkClass}>
                                    My Favourites
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={handleAuthClick}
                                    disabled={user.status === "loading"}
                                    className="c-btn"
                                >
                                    {user.uid ? "Sign out" : "Sign in"}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button
                        type="button"
                        className="c-navbar__menu"
                        aria-controls="navbar-links"
                        aria-expanded={isMenuOpen}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        <span className="u-visually-hide">Menu</span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
