const api_url = ('https://api.wheretheiss.at/v1/satellites/25544');
let mymap = L.map('issmap').setView([50, 0], 2);
let newIcon = L.icon({
    iconUrl: 'ss.svg',
    iconSize: [70, 70],
    iconAnchor: [10, 20]
}); 
let iss = L.marker([0,0], {icon: newIcon}).addTo(mymap).bindPopup('Im here');
let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

async function getISS(){
    const response = await fetch(api_url);
    let data = await response.json();
    let {latitude, longitude} = data;
    console.log(latitude, longitude);
    var latlng = L.latLng(latitude, longitude);
    let tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);   
    iss.setLatLng([latitude, longitude]);
    // document.getElementById('lat').textContent = latitude;
    // document.getElementById('lon').textContent = longitude;
}
setInterval(getISS, 1000);
