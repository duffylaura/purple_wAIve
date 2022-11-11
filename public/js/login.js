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

    if (!response.ok) {
      console.log(await response.json());
      loginValidation();
      return;
      // console.log("successfully logged in");
    } else {
      // If successful, redirect the browser to the homepage page
      document.location.replace("/");
    }
  }
};

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

document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
