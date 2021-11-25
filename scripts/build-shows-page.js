// Define API variables
const SHOWS_API_URL = "https://project-1-api.herokuapp.com/showdates";
const SHOWS_API_KEY = "3bb7f793-84f1-4ab2-9fb8-085eccde5a05";

const showdates = axios
  .get(`${SHOWS_API_URL}/?api_key=${SHOWS_API_KEY}`)
  .then((response) => {
    console.log(response);
    function displayShows() {
      response.data.forEach((show) => {
        let showCard = displayShow(show);
        showsList.appendChild(showCard);
        let hr = document.createElement("hr");
        hr.classList.add("shows__divider");
        showsList.appendChild(hr);
      });
    }
    displayShows();
  });

// Define shows list element
let showsList = document.querySelector(".shows__details");

// Creat show card by using append
function displayShow(show) {
  let showCard = document.createElement("div");
  showCard.classList.add("shows__container");

  let showItemDate = document.createElement("p");
  showItemDate.classList.add("shows__heading");
  showItemDate.innerText = "DATE";

  let dateObj = parseInt(show.date);
  // console.log(show.date);
  // console.log(dateObj);
  let date = new Date(dateObj);
  console.log(date);
  let ddd = String(date.getDay());
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();
  formattedDate = ddd + mm + dd + yyyy;
  let showDate = document.createElement("span");
  showDate.classList.add("shows__date");
  showDate.innerText = date;

  let showItemVenue = document.createElement("p");
  showItemVenue.classList.add("shows__heading");
  showItemVenue.innerText = "VENUE";

  let showVenue = document.createElement("span");
  showVenue.classList.add("shows__venue");
  showVenue.innerText = show.place;

  let showItemLocation = document.createElement("p");
  showItemLocation.classList.add("shows__heading");
  showItemLocation.innerText = "LOCATION";

  let showLocation = document.createElement("p");
  showLocation.classList.add("shows__location");
  showLocation.innerText = show.location;

  let buyButton = document.createElement("button");
  buyButton.classList.add("buy-button");
  buyButton.innerText = "BUY TICKETS";

  showCard.append(
    showItemDate,
    showDate,
    showItemVenue,
    showVenue,
    showItemLocation,
    showLocation,
    buyButton
  );

  return showCard;
}

// Alternating on-click effect
// Ref: https://stackoverflow.com/questions/28412671/how-can-i-highlight-a-link-on-first-click-and-follow-it-on-second-click-unless
let showContainers = document.querySelectorAll(".shows__container");

showContainers.forEach((showContainer) => {
  showContainer.addEventListener(
    "click",
    (function (event) {
      let clicked = false;
      return function (event) {
        // prevent trigger from clicking chilren
        // ref: https://stackoverflow.com/questions/13918441/javascript-addeventlistener-without-selecting-children
        if (e.currentTarget !== e.target) {
          return;
        }
        // add "onClick" to class list if it's not already clicked
        if (!clicked) {
          event.preventDefault();
          event.target.classList.add("onClick");
          clicked = true;
        } else {
          // remove onClick if it's already there
          clicked = event.target.classList.contains("onClick");
          if (clicked) {
            event.target.classList.remove("onClick");
          } else {
            event.preventDefault();
            event.target.classList.add("onClick");
            console.log("add onClick");
            clicked = true;
          }
        }
      };
    })(),
    false
  );
});

//Remove onClick when clicking other areas on the page
document.body.addEventListener(
  "click",
  function (e) {
    [].forEach.call(showContainers, function (showContainer) {
      if (e.target !== showContainer) {
        showContainer.classList.remove("onClick");
      }
    });
  },
  false
);
