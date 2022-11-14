const postTitle = document.querySelector("#song-title");
const postTag = document.querySelector("#input-tags");
const postStyle = document.querySelector("#style");
const postBody = document.querySelector("#postBody");
const addTagButton = document.querySelector("#add-tag");
const tagDisp = document.querySelector("#tags-display");
const createForm = document.querySelector("#create-form");
const resetBtn = document.querySelector("#reset-tag");
let keyword = [];

const createPostForm = async (e) => {
  e.preventDefault();

  const loader = document.querySelector("#modalLoader");
  loader.classList.add("is-active");
  const newTitle = postTitle.value;
  const newBody = postBody.value;
  const newStyle = postStyle.value;

  setTimeout(function () {
    loader.classList.remove("is-active");
  }, 5000);
  console.log(newStyle);

  if (newTitle && newBody && newStyle && keyword) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        newTitle,
        keyword,
        newStyle,
        newBody,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      createRedir();
      return;
    } else {
      alert("post creation failed, please try again");
    }
  }
};

//logic to add tag to page for action feedback and to keep track of our keywords;
const addTag = (e) => {
  let i = 1;
  e.preventDefault();
  //taking a hold of the value
  let tag = postTag.value.trim();
  keyword.push(tag);
  console.log(keyword);
  //making new container to store that, with bulma class
  let newTag = document.createElement("span");
  newTag.classList.add("tag", "is-medium");
  //adding the content
  newTag.innerHTML = ` ${tag} `;
  //appending to display;
  tagDisp.append(newTag);
  //clearing input field
  postTag.value = "";
};

const resetTag = (e) => {
  e.preventDefault();

  keyword = [];
  postTag.value = "";
  tagDisp.innerHTML = "";
};

//function to display an error modal if the user inputts an incorrect password or email
const createRedir = () => {
  const modalOKBtn = document.querySelector("#redirBtn");
  const modalTextEl = document.querySelector("#redirMsg");
  const modalEl = document.querySelector("#redirect");
  modalEl.classList.add("is-active");
  modalTextEl.textContent = "Redirecting to your profile :)";
  modalOKBtn.addEventListener("click", function () {
    modalEl.classList.remove("is-active");
    window.location.assign("/profile");
  });
};

resetBtn.addEventListener("click", resetTag);
addTagButton.addEventListener("click", addTag);
createForm.addEventListener("submit", createPostForm);
