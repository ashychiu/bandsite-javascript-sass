// Define API variables
const COMMENTS_API_URL = "https://project-1-api.herokuapp.com/comments";
const COMMENTS_API_KEY = "0a428c93-8d64-4666-ae99-a91c6553b8d6";

const apiComments = axios
  .get(`${COMMENTS_API_URL}/?api_key=${COMMENTS_API_KEY}`)
  .then((response) => {
    sortComments(response.data);
    displayComments(response.data);
  });

//sort response by timestamp
//ref: https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
function sortComments(responseData) {
  responseData.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });
}

function displayComments(responseData) {
  responseData.forEach((comment) => {
    let commentCard = displayComment(comment);
    commentsList.appendChild(commentCard);
    let likeButton = document.createElement("img");
    let hr = document.createElement("hr");
    hr.classList.add("comment__divider");
    commentsList.appendChild(hr);
  });
}

// Create Comment list element
let commentsList = document.querySelector(".comment__list-container");

// Create comment card by using appendchild
function displayComment(comment) {
  let commentCard = document.createElement("div");
  commentCard.classList.add("message__outter-container");

  let avatarContainer = document.createElement("div");
  avatarContainer.classList.add("message__avatar-container");
  commentCard.appendChild(avatarContainer);

  let avatarElement = createAvatarElement(comment.image);
  avatarContainer.appendChild(avatarElement);

  // anotherContainer
  let bodyContainer = document.createElement("div");
  bodyContainer.classList.add("message__body-container");
  commentCard.appendChild(bodyContainer);

  // container2
  let topContainer = document.createElement("div");
  topContainer.classList.add("message__top-container");
  bodyContainer.appendChild(topContainer);

  let commentName = createCommentName(comment);
  let commentDate = createCommentDate(comment);
  topContainer.append(commentName, commentDate);

  // anotherContainer2
  let bottomContainer = document.createElement("div");
  bottomContainer.classList.add("message__bottom-container");
  bodyContainer.appendChild(bottomContainer);

  let commentContent = createCommentContent(comment);
  bodyContainer.appendChild(commentContent);

  return commentCard;
}

//Create avatar element
function createAvatarElement(image) {
  let avatarImg = document.createElement("img");
  avatarImg.classList.add("message__avatar");
  avatarImg.src = "./assets/images/placeholder.jpeg";
  avatarImg.alt = "avatar";
  return avatarImg;
}

//Create comment name element
function createCommentName(comment) {
  let commentName = document.createElement("p");
  commentName.classList.add("message__name");
  commentName.innerText = comment.name;
  return commentName;
}

//Create comment date element
//Date formatting - Ref: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function createCommentDate(comment) {
  let date = new Date(comment.timestamp);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();
  formattedDate = mm + "/" + dd + "/" + yyyy;
  let commentDate = document.createElement("p");
  commentDate.classList.add("message__date");
  commentDate.innerText = formattedDate;
  return commentDate;
}

//Create comment content element
function createCommentContent(comment) {
  let commentContent = document.createElement("p");
  commentContent.classList.add("message__content");
  commentContent.innerText = comment.comment;
  return commentContent;
}

//New comment submission
const form = document.getElementById("comment__form");

// Add eventListener to form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // if both name & comment are true then post to API
  if (event.target.name.value && event.target.comment.value) {
    axios
      .post(`${COMMENTS_API_URL}/?api_key=${COMMENTS_API_KEY}`, {
        name: event.target.name.value,
        comment: event.target.comment.value,
      })
      .then((response) => {
        axios
          .get(`${COMMENTS_API_URL}/?api_key=${COMMENTS_API_KEY}`)
          .then((response) => {
            //clear the existing comments
            commentsList.innerHTML = "";
            //sort response by timestamp
            sortComments(response.data);
            //display the new array of comments
            displayComments(response.data);
          });
      });
    // Reset form after sucessful submission
    event.target.reset();
  }
});
