$(document).ready(function () {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                switch (e.srcElement.id) {
                    case "firstname":
                        e.target.setCustomValidity("Firstname cannot be blank");
                        break;
                    case "lastname":
                        e.target.setCustomValidity("Lastname cannot be blank");
                        break;
                }
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity("");
        };
    }
})