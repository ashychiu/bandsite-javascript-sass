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
let showsList = document.querySelector(".shows__title");

// Append show card to shows list
for (let i = 0; i < shows.length; i++) {
  let show = shows[i];
  let showCard = displayShow(show);
  showsList.appendChild(showCard);
}

// Show card
function displayShow(show) {
  let showCard = document.createElement("div");
  showsList.classList.add("shows__container2");

  let showItemDate = document.createElement("p");
  showItemDate.classList.add("shows__heading");
  showItemDate.innerText = "DATE";
  showsList.appendChild(showItemDate);

  let showDate = document.createElement("span");
  showDate.classList.add("shows__date");
  showDate.innerText = show.date;
  showsList.appendChild(showDate);

  let showItemVenue = document.createElement("p");
  showItemVenue.classList.add("shows__heading");

  showItemVenue.innerText = "VENUE";
  showsList.appendChild(showItemVenue);

  let showVenue = document.createElement("span");
  showVenue.classList.add("shows__venue");
  showVenue.innerText = show.venue;
  showsList.appendChild(showVenue);

  let showItemLocation = document.createElement("p");
  showItemLocation.classList.add("shows__heading");
  showItemLocation.innerText = "LOCATION";
  showsList.appendChild(showItemLocation);

  let showLocation = document.createElement("p");
  showLocation.classList.add("shows__location");
  showLocation.innerText = show.location;
  showsList.appendChild(showLocation);

  let buyButton = document.createElement("button");
  buyButton.classList.add("buybtn");
  buyButton.innerText = "BUY TICKETS";
  showsList.appendChild(buyButton);

  let hr = document.createElement("hr");
  hr.classList.add("comment__divider");
  showsList.appendChild(hr);

  return showCard;
}
