// Define API variables
const SHOWS_API_URL = "https://project-1-api.herokuapp.com/showdates";
const SHOWS_API_KEY = "3bb7f793-84f1-4ab2-9fb8-085eccde5a05";

const showdates = axios
  .get(`${SHOWS_API_URL}/?api_key=${SHOWS_API_KEY}`)
  .then((response) => {
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

    // addEventListener will only work inside the promise and after displayShows()
    let showContainers = document.querySelectorAll(".shows__container");

    showContainers.forEach((showContainer) => {
      showContainer.addEventListener("click", (event) => {
        // prevent trigger from clicking chilren
        //ref: https://stackoverflow.com/questions/13918441/javascript-addeventlistener-without-selecting-children
        if (event.currentTarget !== event.target) {
          return;
        } else {
          event.preventDefault();
          event.target.classList.toggle("onClick"); // toggling "onClick" to class list
        }
      });
    });
    //Remove onClick when clicking other areas
    document.body.addEventListener("click", (event) => {
      showContainers.forEach((showContainer) => {
        if (event.target !== showContainer) {
          showContainer.classList.remove("onClick");
        }
      });
    });
  });

// Define shows list element
let showsList = document.querySelector(".shows__details");

// Create show card by using append
function displayShow(show) {
  let showCard = document.createElement("div");
  showCard.classList.add("shows__container");

  let showItemDate = document.createElement("p");
  showItemDate.classList.add("shows__heading");
  showItemDate.innerText = "DATE";

  //show.date is timestamp in a string, need to convert to object, then convert back to string for extraction
  let dateObj = parseInt(show.date);
  date = new Date(dateObj);
  dateStr = String(date);
  dateOnly = dateStr.substr(0, 15); //Ref: https://www.w3schools.com/jsref/jsref_substr.asp
  let showDate = document.createElement("span");
  showDate.classList.add("shows__date");
  showDate.innerText = dateOnly;

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
