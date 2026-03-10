
// validate sign in form
document.getElementById("signInForm").onsubmit = (event) => {
    clearErrors();
    let isValid = true;

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

    if (!isValid) {
        event.preventDefault();
    }

};