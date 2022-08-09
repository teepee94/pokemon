//-------------------------------------------------------
//                    Cookiebar
//-------------------------------------------------------
//
// Purpose: Show or hide the cookiebar
//
//-------------------------------------------------------
//

export const FECookiebar = {
    "Init": function() {
        FECookiebar.CheckSetCookie();
		FECookiebar.ConfirmCookies();
    },
    "CheckSetCookie": function() {
		this.cookieName = "TeepeeCookiePolicy"; // The cookie name will need changing

		// Show cookie bar if cookie has not been already set
		if(document.cookie.indexOf(FECookiebar.cookieName) < 0) {
            document.getElementById("js-cookiebar").classList.remove("c-cookiebar--hidden");
		}
    },
    "ConfirmCookies": function() {
        const cookiebarConfirmBtn = document.getElementById("js-cookiebar-confirm");

        cookiebarConfirmBtn.addEventListener("click", function(e) {
            e.preventDefault();

            var expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1); // 1 year

			// Date()'s toGMTSting() method will format the date correctly for a cookie
            document.cookie = FECookiebar.cookieName + "=true; path=/; expires=" + expires.toGMTString();
            document.getElementById("js-cookiebar").classList.add("c-cookiebar--hidden");
        })
    }
}