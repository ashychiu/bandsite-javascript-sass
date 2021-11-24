// Define API variables
const SHOWS_API_URL = "https://project-1-api.herokuapp.com/showdates";
const SHOWS_API_KEY = "3bb7f793-84f1-4ab2-9fb8-085eccde5a05";

const showdates = axios
  .get(`${SHOWS_API_URL}/?api_key=${SHOWS_API_KEY}`)
  .then((response) => {
    console.log(response);
    console.log(response.data.location);
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

// Array of show details
// let shows = [
//   {
//     date: "Mon Sept 06 2021",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 21 2021",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Oct 15 2021",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 06 2021",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Nov 26 2021",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 15 2021",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];

// Define shows list element
let showsList = document.querySelector(".shows__details");

// Append show card to shows list
// function displayShows() {
//   shows.forEach((show) => {
//     let showCard = displayShow(show);
//     showsList.appendChild(showCard);
//     let hr = document.createElement("hr");
//     hr.classList.add("shows__divider");
//     showsList.appendChild(hr);
//   });
// }
// displayShows();

// Creat show card by using append
function displayShow(show) {
  let showCard = document.createElement("div");
  showCard.classList.add("shows__container");

  let showItemDate = document.createElement("p");
  showItemDate.classList.add("shows__heading");
  showItemDate.innerText = "DATE";

  var timestamp = 1607110465663;
  var testshowdate = new Date(timestamp);
  // console.log(date.getTime());
  console.log(testshowdate);

  let showDate = document.createElement("span");
  showDate.classList.add("shows__date");
  showDate.innerText = testshowdate;

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

[].forEach.call(showContainers, function (showContainer) {
  showContainer.addEventListener(
    "click",
    (function (e) {
      let clicked = false;
      return function (e) {
        // prevent trigger from clicking chilren
        // ref: https://stackoverflow.com/questions/13918441/javascript-addeventlistener-without-selecting-children
        if (e.currentTarget !== e.target) {
          return;
        }
        // add "onClick" to class list if it's not already clicked
        if (!clicked) {
          e.preventDefault();
          e.target.classList.add("onClick");
          clicked = true;
        } else {
          // remove onClick if it's already there
          clicked = e.target.classList.contains("onClick");
          if (clicked) {
            e.target.classList.remove("onClick");
          } else {
            e.preventDefault();
            e.target.classList.add("onClick");
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
