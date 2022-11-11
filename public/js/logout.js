//function to handle logout
const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("logout unsuccessful");
  }
};

//when the user clicks the logout button the logout function is triggered
document.querySelector("#logoutBtn").addEventListener("click", logout);
