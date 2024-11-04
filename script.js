
// call checkPost by clicking Load button
const saveButton = document.getElementById('load-btn');
saveButton.addEventListener('click', function () { checkPost() });


// function checkPost call function displayPost if any posts are available in the local storage
// If there is no available posts create an article with a message about the mistake

function checkPost() {

    // check if any posts are available in the local storage
    if (localStorage.getItem("posts") === undefined || localStorage.getItem("posts") === "[]" || localStorage.getItem("posts") === null) {

        // create a new article with a message, that there is no new posts
        addArticle("No new posts available", "Click 'Create new post' button to add a new post", "");
    }
    else {
        displayPost();
    }
}


// Function displayPost retrieves posts from local storage, call addArticle to create a new article for every post, and add content to new articles

function displayPost() {

    //retrieve posts from local storage and convert them to array of objects
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    //get value of title, content, image for every post
    posts.forEach(post => {
        let title = post.title;
        let content = post.content;
        let image = post.image;

        // pass title, content and image as parameters to create a new article with content
        addArticle(title, content, image);
    });
}


// Function addArticle creates a new article (with <H2>, <P>, and <img> inside) and adds content from parameters

function addArticle(title, content, image) {

    // create a new article
    const article = document.createElement("article");
    document.body.insertBefore(article, null);

    // create a new title and its content from local storage
    var h2Element = document.createElement('h2');
    h2Element.innerText = title;
    article.appendChild(h2Element);

    // create a new paragraph and its content from local storage 
    var pElement = document.createElement('p');
    pElement.innerText = content;
    article.appendChild(pElement);

    // create a new image and its content from local storage 
    var imageElement = document.createElement('img');
    imageElement.src = `${image}`;
    article.appendChild(imageElement);

}