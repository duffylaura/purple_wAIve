const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("clicked signup");

  const modalEl = document.querySelector(".modal");
  emailValidation();
  passwordValidation();
  if (modalEl.classList.contains("is-active")) {
    return;
  } else {
    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPW").value.trim();

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

      if (response.ok) {
        document.location.replace("/");
      }
    }
  }
};

const emailValidation = () => {
  const emailV = document.querySelector("#signupEmail").value.trim();
  const modalOKBtn = document.querySelector(".ok-btn");
  const modalTextEl = document.querySelector("#user-valid");
  const modalEl = document.querySelector(".modal");

  const regex = /\S+@\S+\.\S+/;
  if (regex.test(emailV) !== true) {
    modalEl.classList.add("is-active");
    modalTextEl.textContent = "Please enter a valid email ";
    modalOKBtn.addEventListener("click", function () {
      modalEl.classList.remove("is-active");
    });
  }
};

const passwordValidation = () => {
  const passwordV = document.querySelector("#signupPW").value.trim();

  const modalOKBtn = document.querySelector(".ok-btn");
  const modalTextEl = document.querySelector("#user-valid");
  const modalEl = document.querySelector(".modal");
  let goodPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (goodPassword.test(passwordV) !== true) {
    modalEl.classList.add("is-active");
    modalTextEl.textContent =
      "Please enter a password with  at least one lowercase letter , one uppercase letter , one digit , one special character , and is at least eight characters long. ";
    modalOKBtn.addEventListener("click", function () {
      modalEl.classList.remove("is-active");
    });
  }
};
document
  .querySelector("#signupBtn")
  .addEventListener("click", signupFormHandler);
