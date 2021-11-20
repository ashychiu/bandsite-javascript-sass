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

// shows list element
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
  buyButton.classList.add("buybtn");
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
