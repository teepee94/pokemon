//-------------------------------------------------------
//                     Forms
//-------------------------------------------------------
//
// Purpose: Validate form entries
//
//-------------------------------------------------------
//

export const FEForms = {
    "Init": function() {
        FEForms.Validate();
    },
    "Validate": function() {
        var inputs = document.querySelectorAll("input, select, textarea");
        Array.prototype.slice.call(inputs).forEach( function(input) {
            input.addEventListener("invalid", function (event) {
                input.classList.remove("valid");
                input.classList.add("error");
            }, false);
            input.addEventListener("blur", function () {
                input.checkValidity();
            });
            input.addEventListener("input", function () {
                if (input.validity.valid) {
                    input.classList.remove("error");
                    input.classList.add("valid");
                }
            });
        });
    }
}