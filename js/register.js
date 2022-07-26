
firebase.auth().useDeviceLanguage();
var errorCodeStatus = false;


const storage = firebase.storage();

var storageRef = storage.ref();
var imagesRef = storageRef.child('images');
let photo_url;
let donePhoto = false;

function uploadImage(name, email, key, uid) {
    let t;
    // Get the file
    const file = document.querySelector("#photo").files[0];
    // Set a random name
    const time = new Date();
    const ms = time.getTime();
    const namez = uid;
    let em = email.replace(".", "@");

    // Upload image
    const task = firebase.storage().ref("profile").child(namez).put(file);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            photo_url = url;
            localStorage.setItem("image", url);

        firebase.database().ref("user/" + em + "/").set({
                "image": url
        }).then(() => {
            donePhoto = true;
            localStorage.setItem("new", "yes");
            location.replace("../");
        });


        })
        .catch(console.error);

    task.on('state_changed', function (snapshot) {
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
                Swal.fire(
            'File',
            'Your image has not been uploaded!',
            'error'
        );

    }, function () {
        // Handle successful uploads on complete
        Swal.fire(
            'File',
            'Your account has been created!',
            'success'
        );        
    });
}


function login() {
    const names = document.getElementById("name").value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (names === null || undefined) {
        return false;
    }

    if (email === null || email === undefined || email == "" || email.length < 1){
        return false;
    }
    if (password === null || password === undefined || password == "" || password.length < 1){
       return false; 
    }

    if (names === null || names === undefined || names == "" || names.length < 1){
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


    let em = email.replace(".", "@");

    let img;

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        const query = firebase.database().ref("user/" + em);
        query.on("child_added", function (snapshot) {
        img = snapshot.val();
        localStorage.setItem("image", img);
        location.replace("../");
    });
    
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

    let uid;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        // Good
        uploadImage(names, email, "a", uuid);

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire('Error', 'Error: ' + errorMessage, 'error');
    })
    if (errorCodeStatus == true) {

    } else {
        localStorage.setItem("username", names);
        localStorage.setItem("uName", email);
        localStorage.setItem("uID", uid);
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

// Function to sign with google

function signWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with google

    firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            localStorage.setItem("username", user.displayName);
            localStorage.setItem("uName", user.email);
            localStorage.setItem("uID", user.uid);
            localStorage.setItem("uStatusAdded", "added");
            localStorage.setItem("uLogged", "true")
            localStorage.setItem("image", user.photoURL);
            location.replace("../");
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    //location.replace("../");
    // ...
  } else {
    // User is signed out
    // ...
  }
});


function toggleLogin(value){
    let login = document.querySelector("#login");
    let register = document.querySelector("#register");

    if (value == true){
        login.classList.add("hidden");
        register.classList.remove("hidden");
    } else {
        login.classList.remove("hidden");
        register.classList.add("hidden");
    }
}
