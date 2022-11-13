//function to hold js logic to make the login page work
const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("clicked login");
  // Collect values from the login form

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#pw").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //if incorrect password or login, then disply the modal
    if (!response.ok) {
      console.log(await response.json());
      loginValidation();
      return;
    }
    else {
      // If successful, redirect the browser to the homepage page
      // document.location.replace("/");
      loginRedir();
      return;
    }
  }
};

//function to display an error modal if the user inputts an incorrect password or email
const loginValidation = () => {
  const modalOKBtn = document.querySelector(".ok-btn");
  const modalTextEl = document.querySelector("#user-valid");
  const modalEl = document.querySelector(".modal");
  modalEl.classList.add("is-active");
  modalTextEl.textContent = "incorrect login credentials";
  modalOKBtn.addEventListener("click", function () {
    modalEl.classList.remove("is-active");
  });
};

//when the user clicks the login button the login function is triggered
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);


//function to display an error modal if the user inputts an incorrect password or email
const loginRedir = () => {
  const modalOKBtn = document.querySelector("#redirBtn");
  const modalTextEl = document.querySelector("#redirMsg");
  const modalEl = document.querySelector("#redirect");
  modalEl.classList.add("is-active");
  modalTextEl.textContent = "Welcome Back!";
  modalOKBtn.addEventListener("click", function () {
    modalEl.classList.remove("is-active")
    window.location.assign("/");
  });
};

//when the user clicks the login button the login function is triggered
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
