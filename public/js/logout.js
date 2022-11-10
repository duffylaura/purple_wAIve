const logout = async () => {
  console.log(
    "logout clicked---------------------------------------------------------------------------------------------------------"
  );
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

document.querySelector("#logoutBtn").addEventListener("click", logout);
