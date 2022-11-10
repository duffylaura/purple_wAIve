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

    if (response.ok) {
      // If successful, redirect the browser to the homepage page
      document.location.replace("/");
      // console.log("successfully logged in");
    } else {
      alert("Login failed.");
      console.log(await response.json());
    }
  }
};

document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
