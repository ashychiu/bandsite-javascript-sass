// Define API variables
const COMMENTS_API_URL = "https://project-1-api.herokuapp.com/comments";
const COMMENTS_API_KEY = "3bb7f793-84f1-4ab2-9fb8-085eccde5a05";

const apiComments = axios
  .get(`${COMMENTS_API_URL}/?api_key=${COMMENTS_API_KEY}`)
  .then((response) => {
    console.log(response);
    console.log(response.data[1].timestamp);
    function displayComments() {
      response.data.forEach((comment) => {
        let commentCard = displayComment(comment);
        commentsList.appendChild(commentCard);
        let hr = document.createElement("hr");
        hr.classList.add("comment__divider");
        commentsList.appendChild(hr);
      });
    }
    displayComments();
  });

// Create Comment list element
let commentsList = document.querySelector(".comment__list-container");

// Create comment card by using appendchild
function displayComment(comment) {
  let commentCard = document.createElement("div");
  commentCard.classList.add("comment__container");

  let avatarContainer = document.createElement("div");
  avatarContainer.classList.add("comment__avatar-container");
  commentCard.appendChild(avatarContainer);

  let avatarElement = createAvatarElement(comment.image);
  avatarContainer.appendChild(avatarElement);

  let anotherContainer = document.createElement("div");
  anotherContainer.classList.add("comment__container1");
  commentCard.appendChild(anotherContainer);

  let container2 = document.createElement("div");
  container2.classList.add("comment__container2");
  anotherContainer.appendChild(container2);

  let commentName = createCommentName(comment);
  let commentDate = createCommentDate(comment);
  container2.append(commentName, commentDate);

  let anotherContainer2 = document.createElement("div");
  anotherContainer2.classList.add("comment__container2");
  anotherContainer.appendChild(anotherContainer2);

  let commentContent = createCommentContent(comment);
  anotherContainer2.appendChild(commentContent);

  return commentCard;
}

//Create avatar element
function createAvatarElement(image) {
  let avatarImg = document.createElement("img");
  avatarImg.classList.add("comment__avatar");
  avatarImg.src = "./assets/images/placeholder.jpeg";
  avatarImg.alt = "avatar";
  return avatarImg;
}

//Create comment name element
function createCommentName(comment) {
  let commentName = document.createElement("p");
  commentName.classList.add("comment__name");
  commentName.innerText = comment.name;
  return commentName;
}

//Create comment date element
function createCommentDate(comment) {
  let commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.innerText = comment.date; // need to work on formatting timestamp into date
  return commentDate;
}

//Create comment content element
function createCommentContent(comment) {
  let commentContent = document.createElement("p");
  commentContent.classList.add("comment__content");
  commentContent.innerText = comment.comment;
  return commentContent;
}

// Get current date
// Ref: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

// Push new comment to the array when submit
const form = document.getElementById("comment__form");

// Add eventListener to form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // form validation
  if (!event.target.name.value) {
    alert("Please enter your name");
  }
  if (!event.target.comment.value) {
    alert("Please leave a comment");
  }
  // if both name & comment are true then push new comment to array
  if (event.target.name.value && event.target.comment.value) {
    let newCommentObject = {
      name: event.target.name.value,
      date: today,
      image: {
        url: "Mohan-muruge.jpg",
        alt: "avatar",
      },
      content: event.target.comment.value,
    };
    //puch new comment to be first object
    comments.unshift(newCommentObject);

    //clear the existing comments
    commentsList.innerHTML = "";

    //display the new array of comments
    displayComments();

    // Reset form after sucessful submission
    event.target.reset();
  }
});
