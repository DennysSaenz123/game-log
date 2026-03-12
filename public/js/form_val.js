document.getElementById("addGameForm").onsubmit = (event) => {

    clearErrors();

    let isValid = true;

    // validate title
    let title = document.getElementById("title").value.trim();
    if (!title) {
        document.getElementById("err-title").style.display = "block";
        isValid = false;
    }

    // validate status
    let status = document.getElementsByName("status");
    let statusSelected = false;
    for (let i = 0; i < status.length; i++) {
        if (status[i].checked) {
            statusSelected = true;
        }
    }
    if (!statusSelected) {
        document.getElementById("err-status").style.display = "block";
        isValid = false;
    }

    // validate rating
    let rating = document.getElementById("rating").value;
    if (!rating) {
        document.getElementById("err-rating").style.display = "block";
        isValid = false;
    }

    // validate genres
    let genres = document.getElementsByName("genres");
    let genreSelected = false;
    for (let i = 0; i < genres.length; i++) {
        if (genres[i].checked) {
            genreSelected = true;
        }
    }
    if (!genreSelected) {
        document.getElementById("err-genres").style.display = "block";
        isValid = false;
    }

     if (!isValid) {
        event.preventDefault();
    }

};

// // validate register form
// document.getElementById("registerForm").onsubmit = (event) => {
//     clearErrors();
//     let isValid = true;

//     let firstName = document.getElementById("firstName").value.trim();
//     if (!firstName) {
//         document.getElementById("err-firstName").style.display = "block";
//         isValid = false;
//     }

//     let lastName = document.getElementById("lastName").value.trim();
//     if (!lastName) {
//         document.getElementById("err-lastName").style.display = "block";
//         isValid = false;
//     }

//     let email = document.getElementById("email").value.trim();
//     if (!email) {
//         document.getElementById("err-email").style.display = "block";
//         isValid = false;
//     }

//     let username = document.getElementById("username").value.trim();
//     if (!username) {
//         document.getElementById("err-username").style.display = "block";
//         isValid = false;
//     }

//     let password = document.getElementById("password").value.trim();
//     if (!password) {
//         document.getElementById("err-password").style.display = "block";
//         isValid = false;
//     }

//     if (!isValid) event.preventDefault();
// };


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

    if (!isValid){
        event.preventDefault();
    } 
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
};