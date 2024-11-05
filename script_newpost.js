
// call checkPOst function by clicking save button
const saveButton = document.getElementById('save-btn');
saveButton.addEventListener('click', checkPost);


// function checks if the title and content fields are empty 

function checkPost() {

    // get fields by ID
    const title = document.getElementById('title');
    const content = document.getElementById('content');

    //check if the title or content are empty
    if (title.value.trim() === "" || content.value.trim() === "")

    // if title or content is empty call error  
    { throw new Error("Please fill out the title and the content"); }
    else {

        // if title and content are written call savePost function 
        savePost();
    }
}


// function saves changed post

function savePost() {

    // get fields by ID
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const image = document.getElementById('image');

    // put values of the fields in a new object
    const posts = { title: title.value, content: content.value, image: image.value };

    let postsInStorage = [];

    // check if the local storage contains a value
    if (localStorage.getItem("posts") !== undefined) {

        // get posts from the local storage, convert it to an array
        postsInStorage = JSON.parse(localStorage.getItem("posts") || "[]");
    }

    // add a new object to the end of the array
    postsInStorage.push(posts);

    // set new array to the local storage
    localStorage.setItem("posts", JSON.stringify(postsInStorage));

    // reload the form
    document.getElementById('form').reset();
}


