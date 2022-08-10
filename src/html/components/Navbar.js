import React, { useEffect } from 'react'
import ArrowDownIcon from "../../resources/icons/ArrowDownIcon"
import { FENavbar } from "../../resources/js/NavbarFe"
import "../../resources/sass/components/_components.navbar.scss"
import SearchIcon from "../../resources/icons/SearchIcon"
import UserIcon from "../../resources/icons/UserIcon"

function Navbar() {

	useEffect(() => {
		FENavbar.Init();
	}, [])
	
	return (
		<>
		<a href="#main-content">Skip to content</a>
		<nav className="c-navbar">
			<div className="container">
				<div className="row">
					<div className="c-navbar__container">
						<a href="/" className="c-navbar__brand">
							<img src="/resources/images/logo.png" alt="logo" />
						</a>
						<div className="c-navbar__links" id="js-navbar-links">
							<ul className="c-navbar__list">
								<li className="c-navbar__item c-navbar__item--dropdown">
									<a href="/pokemon" className="c-navbar__link">
										All Pokemon
										<ArrowDownIcon />
									</a>
									<div className="c-navbar__dropdown">
										<div className="c-navbar__dropdown-wrapper">
											<ul className="c-navbar__dropdown-list">
												<li className="c-navbar__dropdown-item"><a href="" className="c-navbar__dropdown-link">About</a></li>
												<li className="c-navbar__dropdown-item"><a href="" className="c-navbar__dropdown-link">Dropdown link</a></li>
												<li className="c-navbar__dropdown-item"><a href="" className="c-navbar__dropdown-link">Another Dropdown link</a></li>
												<li className="c-navbar__dropdown-item"><a href="" className="c-navbar__dropdown-link">Dropdown link</a></li>
												<li className="c-navbar__dropdown-item"><a href="" className="c-navbar__dropdown-link">Another Dropdown link</a></li>
											</ul>
										</div>
									</div>
								</li>
								<li className="c-navbar__item c-navbar__item--dropdown">
									<a href="/pokemon" className="c-navbar__link">
										Compare
									</a>
								</li>
								<li className="c-navbar__item c-navbar__item--dropdown">
									<a href="/" className="c-navbar__link">
										<div className="c-navbar__link-icon">
											<UserIcon />
										</div>
									</a>
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