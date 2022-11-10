const signupFormHandler = async (event) => {
  event.preventDefault();
  // console.log("clicked");
  console.log("clicked signup");
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
    } else {
      alert("sign-up failed.");
    }
  }
};

document
  .querySelector("#signupBtn")
  .addEventListener("click", signupFormHandler);
