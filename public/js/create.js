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

  const newTitle = postTitle.value;
  const newBody = postBody.value;
  const newStyle = postStyle.value;
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
      document.location.replace("/profile");
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

resetBtn.addEventListener("click", resetTag);
addTagButton.addEventListener("click", addTag);
createForm.addEventListener("submit", createPostForm);
