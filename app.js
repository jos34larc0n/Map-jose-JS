/* Obtain the user's current location. */
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const coordinates = [
          position.coords.latitude,
          position.coords.longitude
        ];
        const map = buildMap(coordinates);
        const marker = L.marker(this.coordinates)
        marker
        .addTo(this.map)
        .bindPopup('<p1><b>You are here</b><br></p1>')
        .openPopup()
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
getLocation()
/*getCoords() function to get coordinates */
/*async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}*/
/* Map the location on a Leaflet map.*/
const map = L.map('map').setView([35.884766, -78.625053], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*Create leaflet map */
function buildMap(coordinates) {
    const map = L.map('map').setView(coordinates, 13);
    /*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'. Change to streetmap*/
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	  minZoom: '15',
    }).addTo(map);
    return map;
  }

/* Allow the user to select a business type from a list and map the five nearest locations on the map using the Foursquare API. */


