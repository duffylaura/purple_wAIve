const postTitle = document.querySelector("#song-title");
const postTag = document.querySelector("#input-tags");
const postStyle = document.querySelector('#style');
const postBody = document.querySelector('#postBody');
const addTagButton = document.querySelector('#add-tag');
const tagDisp = document.querySelector('#tags-display');

const creatPostForm = async (e) => {
    e.preventDefault();



    // if(postTitle && postTag && postStyle && postBody) {
    //     const response 
    // }


}
//logic to add tag to page for action feedback;
const addTag = (e) => {
    e.preventDefault();
    //taking a hold of the value 
    let tag = postTag.value;
    //making new container to store that, with bulma class
    let newTag = document.createElement("span");
    newTag.classList.add("tag", "is-warning", "is-medium");
    //adding the content
    newTag.innerHTML = tag;
    //appending to display;
    tagDisp.append(newTag);
};

addTagButton.addEventListener("click", addTag);


