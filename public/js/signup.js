//function that contains the js logic for the signup handlbars file
const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("clicked signup");
  //selecting the popup modal element in the signup handle bars
  const modalPw = document.querySelector("#PwModal");
  const modalEmail = document.querySelector("#emailModal");
  //calling on the email and password validation functions.
  emailValidation();
  passwordValidation();
  //if one these functions add "is-active" class to the modal element then return (ie stop the signupformhandler function here)
  if (modalPw.classList.contains("is-active")) {
    return;
  }
  if (modalEmail.classList.contains("is-active")) {
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
      //if response is a  not success then stop else ho to homepage
      if (!response.ok) {
        duplicateCheck();
        console.log(await response.json());
        return;
      } else {
        document.location.replace("/");
      }
    }
  }
};

//email validation function that checks that the value that the user inputted into the email field follows standard email syntax
const emailValidation = () => {
  const emailV = document.querySelector("#signupEmail").value.trim();
  const modalEmailOKBtn = document.querySelector("#emailOKBtn");
  const modalEmail = document.querySelector("#emailModal");
  //declaring regex variable to test if the inputted email does meet the standard email syntax
  const regex = /\S+@\S+\.\S+/;
  if (regex.test(emailV) !== true) {
    // if email does not meet the standards, then unhide modal
    modalEmail.classList.add("is-active");
    modalEmailOKBtn.addEventListener("click", function () {
      modalEmail.classList.remove("is-active");
    });
  }
};

//function to make sure the user inputted a password that is at least 8 long, uses lowercase, uppercase, #s and special characters
const passwordValidation = () => {
  const passwordV = document.querySelector("#signupPW").value.trim();

  const PWmodalOKBtn = document.querySelector("#PWmodalOK");

  const modalPw = document.querySelector("#PwModal");
  //declaring regex variable to test if the inputted password does meet the strong password criteria
  let goodPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (goodPassword.test(passwordV) !== true) {
    // if email does not meet the standards, then unhide modal
    modalPw.classList.add("is-active");

    PWmodalOKBtn.addEventListener("click", function () {
      modalPw.classList.remove("is-active");
    });
  }
};

// function to check if the username already exists and if does give them a pop up modal saying that

const duplicateCheck = () => {
  const dupOKBtn = document.querySelector("#dupOkBtn");
  const modalDuplicate = document.querySelector("#dupCheck");

  // if email or password is already taken  then unhide modal
  modalDuplicate.classList.add("is-active");
  dupOKBtn.addEventListener("click", function () {
    modalDuplicate.classList.remove("is-active");
  });
};

//when the user clicks the sign up button the signup function is triggered
document
  .querySelector("#signupBtn")
  .addEventListener("click", signupFormHandler);
