//function that contains the js logic for the signup handlbars file
const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("clicked signup");
  //selecting the popup modal element in the signup handle bars
  const modalEl = document.querySelector(".modal");
  //calling on the email and password validation functions.
  emailValidation();
  passwordValidation();
  //if one these functions add "is-active" class to the modal element then return (ie stop the signupformhandler function here)
  if (modalEl.classList.contains("is-active")) {
    return;
  } else {
    //if neither these functions add "is-active" class then proceed with signup function and select the values inputted by the user
    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPW").value.trim();

    //only if username is filled out (along with pw and email then do a fetch)
    if (username && email && password) {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      //if response is a success then redirect to homepage
      if (response.ok) {
        document.location.replace("/");
      }
    }
  }
};

//email validation function that checks that the value that the user inputted into the email field follows standard email syntax
const emailValidation = () => {
  const emailV = document.querySelector("#signupEmail").value.trim();
  const modalOKBtn = document.querySelector(".ok-btn");
  const modalTextEl = document.querySelector("#user-valid");
  const modalEl = document.querySelector(".modal");
  //declaring regex variable to test if the inputted email does meet the standard email syntax
  const regex = /\S+@\S+\.\S+/;
  if (regex.test(emailV) !== true) {
    // if email does not meet the standards, then unhide modal
    modalEl.classList.add("is-active");
    modalTextEl.textContent = "Please enter a valid email ";
    modalOKBtn.addEventListener("click", function () {
      modalEl.classList.remove("is-active");
    });
  }
};

//function to make sure the user inputted a password that is at least 8 long, uses lowercase, uppercase, #s and special characters
const passwordValidation = () => {
  const passwordV = document.querySelector("#signupPW").value.trim();

  const modalOKBtn = document.querySelector(".ok-btn");
  const modalTextEl = document.querySelector("#user-valid");
  const modalEl = document.querySelector(".modal");
  //declaring regex variable to test if the inputted password does meet the strong password criteria
  let goodPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (goodPassword.test(passwordV) !== true) {
    // if email does not meet the standards, then unhide modal
    modalEl.classList.add("is-active");
    modalTextEl.textContent =
      "Please enter a password with  at least one lowercase letter , one uppercase letter , one digit , one special character , and is at least eight characters long. ";
    modalOKBtn.addEventListener("click", function () {
      modalEl.classList.remove("is-active");
    });
  }
};

//function to check if the username already exists and if does give them a pop up modal saying that

const usernameCheck = () => {
  const usernameValue = document.querySelector("#signupUsername").value.trim();

  // if username is taken already, then unhide modal
  modalEl.classList.add("is-active");
  modalTextEl.textContent = "Username already taken. ";
  modalOKBtn.addEventListener("click", function () {
    modalEl.classList.remove("is-active");
  });
};
//when the user clicks the sign up button the signup function is triggered
document
  .querySelector("#signupBtn")
  .addEventListener("click", signupFormHandler);
