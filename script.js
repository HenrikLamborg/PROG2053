let currentpage = 1; // keeping track of the current page
let limit = 12;      // limiting the number of posts to fetch

// function to create posts and appending them into the div
function createPost(post) {
    const postContainer = document.getElementById('post-container');
    const postElement = document.createElement('div'); // Create a new div for each post

    // making the layout how I want it to be
    postElement.classList.add('post');
    postElement.innerHTML =  `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;

    postContainer.appendChild(postElement); // appending the post
}

// async function to fetch posts
async function fetchPosts(page, limit){
    try {
        // setting the correct url with parameters (page and limit)
        const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
        const response = await fetch(url) // fetching
        const posts = await response.json();
        console.log('Posts fetched', posts);        // logging the fetched posts (for debugging)
        posts.forEach(post => createPost(post));    // loop through each post and calling createpost(post)

    }catch (error) {
        console.log('Error fetching');             // logging errors
    }

}
// listener used to pick up scrolls in the page and triggers actions
window.addEventListener('scroll', () => {
    // Destructure to get the current scroll position and viewport size
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
   // checks if the user has scrolled all the way to the bottom of the page, and then fetches more posts
    if(scrollTop + clientHeight >= scrollHeight - 1 ){
        currentpage++;  // Increment the page number
        fetchPosts(currentpage,6);
    }
})

// Initial call to fetch posts when the page loads :)
fetchPosts(currentpage, limit);