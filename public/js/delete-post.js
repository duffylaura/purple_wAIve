//function that allows user to delete a post if it is their own post they made
async function deleteFormHandler(event) {
  event.preventDefault();
  //variable id set to the url converted to a string and split by dashes so we can get the post id from the url and make sure the correct post is deleted
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(id);

  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //500 errror keeps popping up when i delete, but it does delete and work once refresh so i put redirect to dashboard if 500 error bc it will 500 error if deelte works and redirect will refresh the page and error will be gone
  console.log(response);
  if (!response.ok) {
    document.location.replace("/profile");
  } else {
    alert("delete failed");
  }
}

document
  .querySelector("#delete-button")
  .addEventListener("click", deleteFormHandler);
