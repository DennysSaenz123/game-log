document.getElementById("addGameForm").onsubmit = () => {

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


    return isValid;

};



function clearErrors() {

    let errors = document.getElementsByClassName("err");

    for (let i = 0; i < errors.length; i++) {

        errors[i].style.display = "none";

    }

}