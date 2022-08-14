firebase.auth().useDeviceLanguage();

// Authentication check

let log = console.log;
firebase.auth().onAuthStateChanged(function (e) {
  e || (location.replace("../account.html"), log("User is not logged in!"));
});

const uName = localStorage.getItem("username");
const uEmail = localStorage.getItem("uName");
const uID = localStorage.getItem("uID");
const image = localStorage.getItem("image");

function loadInformation() {
  document.getElementById("img").src = image;
  document.getElementById(
    "userEmailUsername"
  ).textContent = `${uName} (${uEmail})`;
}

function logout() {
  firebase.auth().signOut();
  localStorage.setItem("uLogged", "false");
  localStorage.removeItem("room");
  localStorage.removeItem("uStatusAdded");
  Swal.fire("Logged out successfuly");
}

// Function that allows the user to change their password

// We need to add async because we are using await!

async function changePassword() {
  const { value: password } = await Swal.fire({
    title: "Enter your new password",
    input: "password",
    inputPlaceholder: "Enter your password",
    inputAttributes: {
      maxlength: 64,
      autocapitalize: "off",
      autocorrect: "off",
    },
  });
  if (password) {
    var user = firebase.auth().currentUser;
    var response = password;
    var newPassword = response;
    user
      .updatePassword(newPassword)
      .then(function () {
        // Update successful.
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your password has been changed",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch(function (error) {
        // An error happened.
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error : " + error.message,
          showConfirmButton: false,
          timer: 2500,
        });
      });
    // sets the response to nothing to secure the change password
    var response = " ";
  }
}

// Function to delete his account
function deleteAccount() {
  // Check is the user is verified

  Swal.fire({
    title: "Are you sure you want to delete your account?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Are you sure you want to DELETE your account?",
        text: "You won't be able to revert this! This is your last chance!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "DELETE",
      }).then((result) => {
        if (result.isConfirmed) {
          var user = firebase.auth().currentUser;

          user
            .delete()
            .then(function () {
              // User deleted.
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account has been deleted!",
                showConfirmButton: false,
                timer: 2500,
              });
            })
            .catch(function (error) {
              // An error happened.
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error : " + error.message,
                showConfirmButton: false,
                timer: 2500,
              });
            });
        }
      });
    }
  });
}

function goBack() {
  location.replace("../");
}

async function changeUsername() {
  const { value: names } = await Swal.fire({
    title: "Enter your new username",
    input: "text",
    inputPlaceholder: "Enter your username",
    inputAttributes: {
      maxlength: 30,
      autocapitalize: "off",
      autocorrect: "off",
    },
  });

  if (
    names === null ||
    names === undefined ||
    names == "" ||
    names.length > 30
  ) {
    return false;
  }
  localStorage.setItem("username", names);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "You changed your username successfully!",
    showConfirmButton: false,
    timer: 2500,
  });
}
