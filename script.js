//const { response } = require("express");

const res = require("express/lib/response");

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FyYXRlNCIsImEiOiJja3o1YzFhcGowa2U5MnhxZm9jcGx3czA4In0.DnVEciTb-0dVXI3oExaosg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [9.236662699026414, 49.18334730166159], // starting position [lng, lat]
    zoom: 5, // starting zoom
    doubleClickZoom: false
});



// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        //localGeocoder: coordinatesGeocoder,
        //zoom: 4,
        //placeholder: 'Try: -40, 170',
        mapboxgl: mapboxgl,
        types: 'place',
        //autocomplete: true
        //reverseGeocode: true
    })
);

var place;
var pos;
var popup;

map.on('load', () => {
    //theoretically add all current cities from DB to map
    fetch(`https://collegues-map.herokuapp.com/getCities`).then(response =>{
        return response.json;
    }).then(data => {
        for (let i = 0; i < data.length; i++) {
            const city = data[i];
            new mapboxgl.Marker()
                .setLngLat([city.lng, city.lat])
                .addTo(map);
            console.log(city + "added");
        }
    })

    //add new city when double clicking. First click location is converted to city and then show popup wether to add that city
    map.on('dblclick', function (e) {

        pos = e.lngLat.toArray();

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pos[0]},${pos[1]}.json?types=place&access_token=${mapboxgl.accessToken}`).then(response => {
            return response.json();
        }).then(data => {
            place = data.features[0].text;
            console.log(place);

            popup = new mapboxgl.Popup()
                .setLngLat(pos)
                .setHTML(`<div id='pu-div'><p>${place}</p><button id='pu-button' onclick='pufunc()'>confirm</button></div>`)
                .addTo(map);
        })
    });
});

function pufunc() {
    //if confirm is pressed show tmp marker and add to DB
    new mapboxgl.Marker()
        .setLngLat(pos)
        .addTo(map);
    popup.remove();

    var url = `https://collegues-map.herokuapp.com/addCity?city=${place}&lat=${pos[1]}&lng=${pos[0]}`;
            const params = {
                city: place,
                lat: pos[1],
                lng: pos[0] 
            };
            const options = {
                method: 'POST',
                body: JSON.stringify( params )  
            };
            fetch( 'https://collegues-map.herokuapp.com/addCity', options )
                .then( response => response.json() )
                .then( response => {
                    console.log(response);
    } );
}