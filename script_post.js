// call checkUrl once the page is loaded/reloaded
window.addEventListener("load", function () { checkUrl(); });


// call loadUrlWithId once post tytle is selected from drop-down menu
const selectTitle = document.getElementById("select-title");
selectTitle.addEventListener("change", function () {
    loadUrlWithId(selectTitle.options[selectTitle.selectedIndex].text);
});


// call checkChanges by clicking change button
const changeButton = document.getElementById("change-btn");
changeButton.addEventListener("click", function () { checkChanges(); });


// call deletePost by clicking deleteButton
const deleteButton = document.getElementById("delete-btn");
deleteButton.addEventListener("click", function () { deletePost(); });




// function gets post title as a parameter, find post ID, create URL with ID and load it

function loadUrlWithId(postTitle) {

    //retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    // find index of an array element with the passed value of title
    let postIndex = null;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]['title'] === postTitle) {
            postIndex = i;
            break;
        }
    }

    let id = postIndex + 1; // ID is a serial number of a post, not an index number

    // get the current URL
    const currentUrl = window.location.href;
    // add post ID to the URL
    const urlWithId = `${currentUrl}?id=${id}`;
    // load URL with ID
    window.location.assign(urlWithId);
}




// function get the current URL and check, if it contains post ID. Call createDropDownMenu() or loadPost(id)

function checkUrl() {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const id = url.searchParams.get('id');
    console.log(id);

    if (id === null) { createDropDownMenu() }
    else { loadPost(id); }
}




// function retrieve posts from the local storage, get post titles and pass them to addTargetOption to create drop-down menu

function createDropDownMenu() {

    //retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    //get value of title for every post
    posts.forEach(post => {
        let title = post.title;

        // pass title as a parameter to create a addTargetOption (function add new target option in the drop-down menu)
        addTargetOption(title);
    });
}




// function add title passed as a parameter in drop-down list

function addTargetOption(title) {

    const SelectTitle = document.getElementById("select-title");

    // create a new target option
    var titleName = document.createElement('option');

    // pass value to the new option
    titleName.innerHTML = `${title}`;

    //place the new option in the Select
    SelectTitle.appendChild(titleName);
}




// function gets post ID as a parameter and fill in the form with post's data

function loadPost(id) {

    let postIndex = id - 1;

    //retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    // fill in the form fields
    const postId = document.getElementById("ID");
    postId.value = id;

    const title = document.getElementById("title");
    title.value = posts[postIndex]["title"];

    const content = document.getElementById("content");
    content.value = posts[postIndex]["content"];

    const image = document.getElementById("image");
    image.value = posts[postIndex]["image"];

}




// checks if title or content empty. Call saveChanges if title and changes are filled in. Throw mistake if title or content is empty

function checkChanges() {

    // get elements by ID
    const id = document.getElementById('ID');
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const image = document.getElementById('image');

    // check if title or content is empty
    if (title.value.trim() === "" || content.value.trim() === "")

    // if title or content is empty call alert  
    { throw new Error("Please fill out the title and the content"); }
    else {
        // if title and content are written call savePost function 
        saveChanges();
    }
}




// save changes in the post

function saveChanges() {

    // get elements by ID
    const id = document.getElementById('ID');
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const image = document.getElementById('image');

    // create a new object with post data
    const postToLoad = { title: title.value, content: content.value, image: image.value };

    // convert the object to String        
    const postsString = JSON.stringify(postToLoad);

    // retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    // replace the changed post in posts
    const indexToReplace = id.value - 1;
    posts.splice(indexToReplace, 1, postToLoad)

    // save posts in th elocal storage
    localStorage.setItem("posts", JSON.stringify(posts));

    // reset the form
    document.getElementById('form').reset();

    // call loadUrlWithoutID which remove ID from the URL and load the updated URL
    loadUrlWithoutId();
}




// function gets the current URL, removes ID from the URL and load the updated URL without ID

function loadUrlWithoutId() {

    // get the current URL
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    // get ID from the URL
    const id = url.searchParams.get('id');

    // remove id from the URL
    let urlWithoutId = currentUrl.replace(`?id=${id}`, "");

    // load the new URL
    window.location.assign(urlWithoutId);
}



// function deletes selected post from the local storage

function deletePost() {

    const id = document.getElementById('ID');

    const indexToDelete = id.value - 1;

    // retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    // delete an element from the array posts using its index
    posts.splice(indexToDelete, 1);

    // convert array posts into String and save it to the Local storage
    localStorage.setItem("posts", JSON.stringify(posts));

    // reset the form
    document.getElementById('form').reset();

    // reload the URL
    loadUrlWithoutId();
}