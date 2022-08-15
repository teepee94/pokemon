import { useEffect } from 'react'
import { FENavbar } from "../../resources/js/NavbarFe"
import "../../resources/sass/components/_components.navbar.scss"
import { signInWithGoogle } from '../../resources/js/firebase/firebase';
import firebase from "../../resources/js/firebase/firebase"
import 'firebase/compat/auth';
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import { login, logout, selectUser } from "../../resources/js/redux/userSlice"

import { useSelector, useDispatch } from 'react-redux'
import { selectCompare } from '../../resources/js/redux/compareSlice';

function Navbar() {

	const dispatch = useDispatch()

	useEffect(() => {
		FENavbar.Init();
	}, [])

	const user = useSelector(selectUser)

	const compareItems = useSelector(selectCompare)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
			dispatch(login({
				uid: user.uid,
				displayName: user.displayName
			}))
        })
    }, [dispatch])

	const signOutGoogle = () => {
		const auth = getAuth();
		signOut(auth)
		dispatch(logout())
	}
	
	
	return (
		<>
		<a href="#main-content">Skip to content</a>
		<nav className="c-navbar" id="js-navbar">
			<div className="container">
				<div className="row">
					<div className="c-navbar__container">
						<a href="/" className="c-navbar__brand">
							<img src="/resources/logo.png" alt="logo" />
						</a>
						<div className="c-navbar__links" id="js-navbar-links">
							<ul className="c-navbar__list">
								<li className="c-navbar__item">
									<a href="/" className="c-navbar__link">All Pokemon</a>
								</li>
								<li className="c-navbar__item">
									<Link to="/compare" items={compareItems} className="c-navbar__link">Compare</Link>
								</li>
								<li className="c-navbar__item">
									<Link to="/account" className="c-navbar__link">My Favourites</Link>
								</li>
								<li className="c-navbar__item">
									<button onClick={user.uid ? signOutGoogle : signInWithGoogle} className="c-sign-in__btn c-btn">{user.uid? "Sign Out" : "Sign In"}</button>
								</li>
							</ul>
						</div>
						<button className="c-navbar__menu" id="js-navbar-menu-toggle" aria-controls="js-navbar-links">
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