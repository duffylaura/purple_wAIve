//function to allow user to edit one of their possts
async function editFormHandler(event) {
  event.preventDefault();
  //grab values of the title and body of the post
  const title = document.querySelector("#edit-title").value;
  const body = document.querySelector("#edit-body").value;
  //variable id set to the url converted to a string and split by dashes so we can get the post id from the url and make sure the correct post is updated
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace(`/profile`);
  } else {
    alert("edit failed");
  }
}

document
  .querySelector("#edit-button")
  .addEventListener("click", editFormHandler);
