//-------------------------------------------------------
//                     Navbar
//-------------------------------------------------------
//
// Purpose: Update navbar states
//
//-------------------------------------------------------
//

export const FENavbar = {
    "Init": function() {
        FENavbar.BurgerNav()
        FENavbar.NavDropdown()
    },
    "BurgerNav": () => {
        let burger = document.querySelector("#js-navbar-menu-toggle")
        let body = document.querySelector("body");

        // Toggle the menu on click
        burger.addEventListener("click", (e) => {
            e.preventDefault();
            body.classList.toggle("is-nav-open");
        });
    },
    "NavDropdown": () => {
        let toucheventsNavLinks = Array.from(document.querySelectorAll("html.touchevents #js-navbar-links >ul >li >a"))
        // Checking if the element Array exists on the page.
        if (toucheventsNavLinks) {
            // Make the dropdown nav work on touch devices
            toucheventsNavLinks.forEach(link => {

                link.addEventListener("click", handleDropDown)
                link.addEventListener("touchstart", handleDropDown)

                function handleDropDown(e) {
                    let dropdown = link.nextElementSibling;
                    // We only want this to happen if that nav item has a dropdown
                    if (dropdown) {
                        e.preventDefault();
                        if (dropdown.classList.contains("is-active")) {
                            // Hide the dropdown nav
                            link.classList.remove("is-active");
                            dropdown.classList.remove("is-active");
                        }
                        else {
                            // Before we show the dropdown nav for that item we need to make sure any other dropdown navs are hidden
                            // Getting all the children of the links, parent parent
                            let siblings = link.parentElement.parentElement.children;
                            for (let sib of siblings) {
                                if (sib.querySelector("div") && sib.querySelector("a")) {
                                    sib.querySelector("div").classList.remove('is-active')
                                    sib.querySelector("a").classList.remove('is-active')
                                }
                            }
                            // Show the dropdown nav
                            link.classList.add("is-active");
                            dropdown.classList.add("is-active");
                        }
                    }
                };
            })

            // Make the dropdown nav work on non touch devices (hover)
            let mouseTargets = Array.from(document.querySelectorAll("html.no-touchevents #js-navbar-links >ul >li"));

            mouseTargets.forEach(mouseTarget => {

                mouseTarget.addEventListener('mouseenter', e => {
                    let dropdown = Array.from(mouseTarget.children);
                    // On mouse enter show the dropdown nav if required
                    if (dropdown) {
                        dropdown.forEach(el => {
                            if (el.classList.contains('c-navbar__dropdown')) {
                                el.classList.add("is-active");
                                el.previousElementSibling.classList.add("is-active");
                            }
                        });
                    }
                })

                mouseTarget.addEventListener('mouseleave', e => {
                    let dropdown = Array.from(mouseTarget.children);
                    // On mouse leave hide the dropdown nav if required
                    if (dropdown) {
                        dropdown.forEach(el => {
                            if (el.classList.contains('c-navbar__dropdown')) {
                                el.classList.remove("is-active");
                                el.previousElementSibling.classList.remove("is-active");
                            }
                        });
                    }
                })
            })

            // Make the dropdown nav work when tabbing
            let navLinks = document.querySelector("html.no-touchevents #js-navbar-links .c-navbar__link");
            let navDropdowns = Array.from(document.querySelectorAll("html.no-touchevents #js-navbar-links .c-navbar__dropdown"));

            let allLinks = Array.from(document.querySelectorAll('html.no-touchevents #js-navbar-links >ul >li >a'));
            // checking if nav has dropdown
            if (allLinks) {
                allLinks.forEach(link => {
                    link.addEventListener('focus', el => {
                        let dropdown = link.nextElementSibling;
                        if (dropdown != null) {
                            let show = !dropdown.classList.contains('is-active');
                            closeOpenItems()
                            // On focus show the dropdown nav if required
                            if (show != null) {
                                link.classList.add("is-active")
                                dropdown.classList.add("is-active")
                            }
                        } else {
                            // Remove active state to link and dropdown if this is tabbed away
                            closeOpenItems()
                        }
                    });

                    // Closes up all the nav dropdowns
                    function closeOpenItems() {
                        let openMenus = Array.from(document.querySelectorAll('.is-active'));
                        console.log(openMenus)
                        openMenus.forEach(menus => {
                            menus.classList.remove('is-active');
                        });
                    }
                });
            }
        }
    },
}