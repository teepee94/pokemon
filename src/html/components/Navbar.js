import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom";
import "../../resources/sass/components/_components.navbar.scss"
import { auth, signInWithGoogle } from '../../resources/js/firebase/firebase';
import { selectUser } from "../../resources/js/redux/userSlice"
import { selectCompare } from "../../resources/js/redux/compareSlice"

const navLinkClass = ({ isActive }) => `c-navbar__link${isActive ? " is-active" : ""}`

function Navbar() {
	const user = useSelector(selectUser)
	const compareCount = useSelector(selectCompare).length
	const [isSticky, setIsSticky] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setIsSticky(window.scrollY > 10)

		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })

		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	// The root auth listener dispatches login/logout, so these only need to
	// talk to Firebase.
	const handleAuthClick = async () => {
		try {
			if (user.uid) {
				await auth.signOut()
			} else {
				await signInWithGoogle()
			}
		} catch (err) {
			// Closing the Google popup rejects; that isn't an error worth surfacing.
			if (err?.code !== "auth/popup-closed-by-user") {
				console.error(err)
			}
		}
	}

	const navClassName = [
		"c-navbar",
		isSticky && "is-sticky",
		isMenuOpen && "is-nav-open",
	].filter(Boolean).join(" ")

	return (
		<>
		<a href="#main-content">Skip to content</a>
		<nav className={navClassName} id="js-navbar">
			<div className="container">
				<div className="row">
					<div className="c-navbar__container">
						<Link to="/" className="c-navbar__brand">
							<img src="/resources/logo.png" alt="Home" />
						</Link>
						<div className="c-navbar__links" id="js-navbar-links">
							<ul className="c-navbar__list">
								<li className="c-navbar__item">
									<NavLink to="/" end className={navLinkClass}>Pokédex</NavLink>
								</li>
								<li className="c-navbar__item">
									<NavLink to="/compare" className={navLinkClass}>
										Compare
										{compareCount > 0 && (
											<span className="c-navbar__badge">
												{compareCount}<span className="u-visually-hide"> selected</span>
											</span>
										)}
									</NavLink>
								</li>
								<li className="c-navbar__item">
									<NavLink to="/account" className={navLinkClass}>My Favourites</NavLink>
								</li>
								<li className="c-navbar__item">
									<button
										onClick={handleAuthClick}
										disabled={user.status === "loading"}
										className="c-sign-in__btn c-btn"
									>
										{user.uid ? "Sign Out" : "Sign In"}
									</button>
								</li>
							</ul>
						</div>
						<button
							className="c-navbar__menu"
							id="js-navbar-menu-toggle"
							aria-controls="js-navbar-links"
							aria-expanded={isMenuOpen}
							onClick={() => setIsMenuOpen(open => !open)}
						>
							<span>
								<span className="u-visually-hide">Menu</span>
							</span>
						</button>
					</div>
				</div>
			</div>
		</nav>
		</>
	)
}

export default Navbar
