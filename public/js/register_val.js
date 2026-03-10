// validate register form
document.getElementById("registerForm").onsubmit = (event) => {
    clearErrors();
    let isValid = true;

    let firstName = document.getElementById("firstName").value.trim();
    if (!firstName) {
        document.getElementById("err-firstName").style.display = "block";
        isValid = false;
    }

    let lastName = document.getElementById("lastName").value.trim();
    if (!lastName) {
        document.getElementById("err-lastName").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if (!email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    let username = document.getElementById("username").value.trim();
    if (!username) {
        document.getElementById("err-username").style.display = "block";
        isValid = false;
    }

    let password = document.getElementById("password").value.trim();
    if (!password) {
        document.getElementById("err-password").style.display = "block";
        isValid = false;
    }

    if (!isValid) event.preventDefault();
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
};