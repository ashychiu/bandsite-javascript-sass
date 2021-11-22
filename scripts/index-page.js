// Array of existing comments
let comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    image: {
      url: "placeholder.jpeg",
      alt: "avatar",
    },
    content:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    image: {
      url: "placeholder.jpeg",
      alt: "avatar",
    },
    content:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    image: {
      url: "placeholder.jpeg",
      alt: "avatar",
    },
    content:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

// Comment list element
let commentsList = document.querySelector(".comment__list-container");

// Using forEach to append comment
function displayComments() {
  comments.forEach((comment) => {
    let commentCard = displayComment(comment);
    commentsList.appendChild(commentCard);
    let hr = document.createElement("hr");
    hr.classList.add("comment__divider");
    commentsList.appendChild(hr);
  });
}
displayComments();

// Creat comment card by using appendchild
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
  avatarImg.src = "./assets/images/" + image.url;
  avatarImg.alt = image.alt;
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
  commentDate.innerText = comment.date;
  return commentDate;
}

//Create comment content element
function createCommentContent(comment) {
  let commentContent = document.createElement("p");
  commentContent.classList.add("comment__content");
  commentContent.innerText = comment.content;
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
