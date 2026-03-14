let wishlistBtn = document.getElementById("wishlist-btn");
let wantStatus = document.querySelector('input[name="status"][value="want"]');
let rating = document.getElementById("rating");

// toggle wishlist manually
wishlistBtn.addEventListener("click", wishlistToggle);

function wishlistToggle() {
    if (wishlistBtn.innerText === "Add Game To Wishlist") {
        wishlistBtn.innerText = "Remove Game From Wishlist";
        // make rating select dropdown inactive
        rating.disabled = true;
        wantStatus.checked = true;
    } else {
        wishlistBtn.innerText = "Add Game To Wishlist";
        wantStatus.checked = false;
        rating.disabled = false;
    }
}

//disable wishlist button when another status is selected
let statusRadios = document.getElementsByName("status");

statusRadios.forEach(radio => {
    radio.addEventListener("change", () => {

        if (radio.value === "want") {
            // enable button when "want" is selected
            wishlistBtn.disabled = false;
        } else {
            // reset and disable button for all other statuses
            wishlistBtn.innerText = "Add Game To Wishlist";
            wishlistBtn.disabled = true;
            wantStatus.checked = false;
        }
    });
});

let addGameForm = document.getElementById("addGameForm");
if (addGameForm) {

    addGameForm.onsubmit = (event) => {
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
        if(status.value === "want") {
            let wishlistBtn = document.getElementById("wishlist-btn");
            wishlistBtn.innerText = "Remove Game From Wishlist";
        }

        // validate rating
        let rating = document.getElementById("rating").value;
        if (rating.enabled && (rating < 1 || rating > 10)) {
            document.getElementById("err-rating").style.display = "block";
            isValid = false;
        }
        // if rating is disabled, ignore it
        if (rating.disabled) {
            document.getElementById("err-rating").style.display = "none";
            isValid = true;
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
}

// validate register form
    let registerForm = document.getElementById("registerForm");
        if(registerForm) {
            registerForm.onsubmit = (event) => {
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

        if (!isValid) {
            event.preventDefault();
        }
    };
}

// validate sign-in form
let signInForm = document.getElementById("signInForm");
if (signInForm) {
    signInForm.onsubmit = (event) => {
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
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}