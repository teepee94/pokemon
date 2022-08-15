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
        FENavbar.Sticky()
        FENavbar.BurgerNav()
    },
    "Sticky": function() {
        window.onscroll = () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                document.getElementById("js-navbar").classList.add("is-sticky")
            } else {
                document.getElementById("js-navbar").classList.remove("is-sticky")
            }
        }
    },
    "BurgerNav": () => {
        let burger = document.querySelector("#js-navbar-menu-toggle")
        let nav = document.getElementById("js-navbar");

        // Toggle the menu on click
        burger.addEventListener("click", (e) => {
            e.preventDefault();
            nav.classList.toggle("is-nav-open");
        });
    },
}