import { replaceMozPressure }
let map = {}
let coordinates = []
let businesses = []
let markers = {}

/* Obtain the user's current location. */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      coordinates = [
        position.coords.latitude,
        position.coords.longitude
      ];
      buildMap(coordinates);
      const marker = L.marker(coordinates)
      marker
        .addTo(map)
        .bindPopup('<p1><b>You are here</b><br></p1>')
        .openPopup()
    }, () => console.log('Geolocation error'));
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
/*Create leaflet map */
function buildMap(coordinates) {
  map = L.map('map').setView(coordinates, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
  }).addTo(map);
}
getLocation()

function addMarker() {
  for (let i = 0; i < businesses.length; i++) {
    markers = L.marker([
      businesses[i].lat,
      businesses[i].long,
    ])
      .bindPopup(`<p1>${businesses[i].name}</p1>`)
      .addTo(map)
  }
}


/*// get foursquare request function*/
async function getFoursquare(business) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3+HNcRJZVhPsjOls2sGNi3bWn5ldhGm+iTWdwDVMdKCI='
    }
  }
  let limit = 5
  let lat = coordinates[0]
  let lon = coordinates[1]
  let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
  let data = await response.text()
  let parsedData = JSON.parse(data)
  let businesses = parsedData.results
  return businesses
}
/*add event listeners */

document.getElementById('submit').addEventListener('click', async (event) => {
  event.preventDefault()
  let business = document.getElementById('business').value
  let data = await getFoursquare(business)
  businesses = processBusinesses(data)
  addMarker()
})


// this function will change all the mozzPressure event for PointerEvent this will provide a standard way to access pressure information for all types of pointer input, including mouse, pen and touch.
