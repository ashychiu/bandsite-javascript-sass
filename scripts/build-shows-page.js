// Array of show details

let shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// Define shows list element
let showsList = document.querySelector(".shows__details");

// Append show card to shows list
function displayShows() {
  shows.forEach((show) => {
    let showCard = displayShow(show);
    showsList.appendChild(showCard);
    let hr = document.createElement("hr");
    hr.classList.add("shows__divider");
    showsList.appendChild(hr);
  });
}
displayShows();

// Creat show card
function displayShow(show) {
  let showCard = document.createElement("div");
  showCard.classList.add("shows__container");

  let showItemDate = document.createElement("p");
  showItemDate.classList.add("shows__heading");
  showItemDate.innerText = "DATE";

  let showDate = document.createElement("span");
  showDate.classList.add("shows__date");
  showDate.innerText = show.date;

  let showItemVenue = document.createElement("p");
  showItemVenue.classList.add("shows__heading");
  showItemVenue.innerText = "VENUE";

  let showVenue = document.createElement("span");
  showVenue.classList.add("shows__venue");
  showVenue.innerText = show.venue;

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

// [].forEach.call(showContainers, function (showContainer) {
//   showContainer.addEventListener('mouseover', () {
//     alert("mouse over test!")
//   , false);
//   }
// Alternating on-click effect
// Ref: https://stackoverflow.com/questions/28412671/how-can-i-highlight-a-link-on-first-click-and-follow-it-on-second-click-unless

let showContainers = document.querySelectorAll(".shows__container");

document.body.addEventListener(
  "click",
  function (e) {
    [].forEach.call(showContainers, function (showContainer) {
      // Remove onClick when clicking other areas of the page
      if (e.target !== showContainer) {
        showContainer.classList.remove("onClick");
      }
    });
  },
  false
);

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
            clicked = true;
          }
        }
      };
    })(),
    false
  );
});

// function activeShow() {
//   showContainers.forEach((showContainer) => {
//     showContainer.addEventListener("click", () => {
//       console.log("testing");
//       showContainer.classList.add("onClick");
//     });
//   });
// }
// activeShow();

// function removeActive() {
//   showContainers.forEach((showContainer) => {
//     if (showContainer.classList.contains(".onClick")) {
//       showContainers.classList.remove(".onClick");
//       console.log("contains onClick");
//     }
//   });
// }
// removeActive();

// function handleActiveShow() {
//   showContainer.addEventListener("Click", () => {});
// }
// handleActiveShow();

//   if (showContainer.classList.contains(".onClick")) {
//     showContainer.classList.remove(".onClick");
//     console.log("contains onClick");
//     showContainer.removeEventListener("mouseover", handleEasterEgg);
//     easterEgg.removeEventListener("mouseout", handleEasterEgg);
//   } else {
//     showContainer.classList.add("onClick");
//   }
// });
// showContainer.addEventListener("onmouseover", () => {
//   console.log("mouseover test");
//   showContainer.classList.add("mouseover");
// });
