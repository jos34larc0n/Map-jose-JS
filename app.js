let map = {}
let coordinates = []
let businesses = []
let markers = {}

/* Obtain the user's current location. */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
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
	  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
//processBusinesses function
function processBusinesses(data) {
  let processedBusinesses = []
  for (let i = 0; i < data.results.length; i++) {
    let business = {
      name: data.results[i].name,
      lat: data.results[i].location.lat,
      long: data.results[i].location.lng
    }
    processedBusinesses.push(business)
  }
  return processedBusinesses
}



/*// get foursquare request function*/
async function getFoursquare(business) {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          'Client-ID': 'J0LF3ACW3UWEE0HCEQQG3BAG4KAQCBVYJLCRTW1NON4SWDUT',
          'Client-Secret': '4USYCHYJXR4AHKZCVBI4NEBFBTRYSUPOBZBPXVKLPMUULS5J'
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
  business = processBusinesses(data)
  if(data.results.length > 0){
  businesses = processBusinesses(data)
  addMarker()
  }else{
  alert("No Business Found")
  }
  })
  
  //this function will change all the mozzPressure event for a pointer Event this will provide a standard way to access pressure information for all types of pointer input, including mouse, pen and touch.
  function replaceMozPressure() {
  let elements = document.querySelectorAll("*");
  for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("pointerdown", (e) => {
  let pressure = e.pressure;
  });
  }
  }
  replaceMozPressure();