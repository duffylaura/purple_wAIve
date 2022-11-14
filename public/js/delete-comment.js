//function that allows user to delete a post if it is their own post they made
async function deleteCommentHandler(event) {
  event.preventDefault();

  console.log("delete commetn clicked");
  //variable id set to the url converted to a string and split by dashes so we can get the post id from the url and make sure the correct post is deleted
  // const id = document
  //   .querySelector("#deleteCommentBtn")
  //   .getAttribute("data-attribute");
  // console.log(id);

  const id = event.target.getAttribute("data-attribute");

  const response = await fetch(`/api/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //500 errror keeps popping up when i delete, but it does delete and work once refresh so i put redirect to dashboard if 500 error bc it will 500 error if deelte works and redirect will refresh the page and error will be gone
  console.log(response);
  if (response.ok) {
    // document.location.replace("/profile");
    document.location.reload();
  } else {
    alert("delete failed");
  }
}

// document
//   .querySelector("#deleteCommentBtn")
//   .addEventListener("click", deleteCommentHandler);
function deleteBtnArray() {
  console.log("delete button function running");
  const deleteBtns = document.querySelectorAll("#deleteCommentBtn");
  console.log(deleteBtns);
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteCommentHandler);
  }
  console.log("delete button function running more");
}

deleteBtnArray();
// const myNodelist = document.querySelectorAll("p");
// for (let i = 0; i < myNodelist.length; i++) {
//   myNodelist[i].style.color = "red";
// }
