
firebase.auth().useDeviceLanguage();
var errorCodeStatus = false;


function login() {
    const names = document.getElementById("name").value;
    if (names === null || undefined) {
        return false;
    }
    let times = new Date();
    let uuid = times.getTime() + names + times.getUTCMilliseconds();
    let time = new Date();
    localStorage.setItem("pswrd-changed-data-now", time.getTime());
    Swal.fire({
        title: "Login in!",
        html: "This wont take a lot of time!",
        timer: 1e3,
        timerProgressBar: !0,
        onBeforeOpen: () => {
            Swal.showLoading(), timerInterval = setInterval(() => { }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then(e => {
        e.dismiss, Swal.DismissReason.timer
    });
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        location.replace("../");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire('Error', `Error: ` + errorMessage, 'error');
        console.log("Error");
        errorCodeStatus = true;
    })
    if (errorCodeStatus == true) {
    } else {
        localStorage.setItem("username", names);
        localStorage.setItem("uName", email);
        localStorage.setItem("uID", uuid);
        localStorage.setItem("uStatusAdded", "added");
        localStorage.setItem("uLogged", "true")
        errorCodeStatus = false;
    }
}

function register() {
    const names = document.getElementById("name").value;
    if (names === null || undefined) {
        return false;
    }
    let times = new Date();
    let uuid = times.getTime() + names + times.getUTCMilliseconds();
    Swal.fire({
        title: "Creating an account for you.",
        html: "This will not take a lot of time!",
        timer: 1e3,
        timerProgressBar: !0,
        onBeforeOpen: () => {
            Swal.showLoading(), timerInterval = setInterval(() => { }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then(e => {
        e.dismiss, Swal.DismissReason.timer
    });
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem("new", "yes");
        location.replace("../");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire('Error', 'Error: ' + errorMessage, 'error');
    })
    if (errorCodeStatus == true) {

    } else {
        localStorage.setItem("username", names);
        localStorage.setItem("uName", email);
        localStorage.setItem("uID", uuid);
        localStorage.setItem("uStatusAdded", "added");
        localStorage.setItem("uLogged", "true")
        errorCodeStatus = false;
    }
}


// Authentication check
const userAdded = localStorage.getItem("uStatusAdded");
const loginCheck = localStorage.getItem("uLogged");

function forgotPassword() {
    var auth = firebase.auth();
    var emailAddress = prompt("Whats your email address?");
    auth.sendPasswordResetEmail(emailAddress)
        .then(function () { 
            Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Email has been send!",
                    showConfirmButton: false,
                    timer: 1500
                });
        })
        .catch(function (error) {
            Swal.fire("Error", "Error: " + error.message, "error");
        });
}

function registerMe() {
    if (emails === null || undefined) {
        return false;
    }
    location.replace("../")
}