async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#edit-title").value;
  const body = document.querySelector("#edit-body").value;

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
