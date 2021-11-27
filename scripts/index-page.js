// Define API variables
const COMMENTS_API_URL = "https://project-1-api.herokuapp.com/comments";
const COMMENTS_API_KEY = "be13363f-eaf9-41e6-9e19-051645967029";

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
  commentCard.classList.add("comment__outter-container");

  let avatarContainer = document.createElement("div");
  avatarContainer.classList.add("comment__avatar-container");
  commentCard.appendChild(avatarContainer);

  let avatarElement = createAvatarElement(comment.image);
  avatarContainer.appendChild(avatarElement);

  let anotherContainer = document.createElement("div");
  anotherContainer.classList.add("comment__body-container");
  commentCard.appendChild(anotherContainer);

  let container2 = document.createElement("div");
  container2.classList.add("comment__top-container");
  anotherContainer.appendChild(container2);

  let commentName = createCommentName(comment);
  let commentDate = createCommentDate(comment);
  container2.append(commentName, commentDate);

  let anotherContainer2 = document.createElement("div");
  anotherContainer2.classList.add("comment__bottom-container");
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
//Date formatting - Ref: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function createCommentDate(comment) {
  let date = new Date(comment.timestamp);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();
  formattedDate = mm + "/" + dd + "/" + yyyy;
  let commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.innerText = formattedDate;
  return commentDate;
}

//Create comment content element
function createCommentContent(comment) {
  let commentContent = document.createElement("p");
  commentContent.classList.add("comment__content");
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
