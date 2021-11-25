// Define API variables
const COMMENTS_API_URL = "https://project-1-api.herokuapp.com/comments";
const COMMENTS_API_KEY = "301b28a3-aa6a-4879-8c25-2c607ada5db6";

const apiComments = axios
  .get(`${COMMENTS_API_URL}/?api_key=${COMMENTS_API_KEY}`)
  .then((response) => {
    console.log(response);
    console.log(response.data[1].timestamp);
    function displayComments() {
      response.data.forEach((comment) => {
        let commentCard = displayComment(comment);
        commentsList.appendChild(commentCard);
        let likeButton = document.createElement("img");
        // likeButton.classList.add("comment__like-button");
        // likeButton.src = "./assets/icons/SVG/icon-like.svg";
        // commentsList.appendChild(likeButton);
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
  // form validation
  if (!event.target.name.value) {
    alert("Please enter your name");
  }
  if (!event.target.comment.value) {
    alert("Please leave a comment");
  }
  // if both name & comment are true then post to api
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
            console.log(response);
            //clear the existing comments
            commentsList.innerHTML = "";

            //sort response by timestamp
            //ref: https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
            response.data.sort(function (x, y) {
              return y.timestamp - x.timestamp;
            });

            //display the new array of comments
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
      });

    // Reset form after sucessful submission
    event.target.reset();
  }
});

// const button = document.querySelectorAll(".comment__like-button");

// button.addEventListener("click", (event) => console.log("liked"));
