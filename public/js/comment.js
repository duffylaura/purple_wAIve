async function commentHandler(event) {
  event.preventDefault();
  console.log(
    "--------------------------------------------------------------------------------------------------------------------------------"
  );
  const text = document.querySelector(".textarea").value;
  console.log(text);

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(post_id);

  const response = await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({
      text,
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#commentBtn").addEventListener("click", commentHandler);
