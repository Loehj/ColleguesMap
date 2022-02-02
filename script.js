mapboxgl.accessToken = 'pk.eyJ1Ijoia2FyYXRlNCIsImEiOiJja3o1YzFhcGowa2U5MnhxZm9jcGx3czA4In0.DnVEciTb-0dVXI3oExaosg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [9.236662699026414,49.18334730166159], // starting position [lng, lat]
    zoom: 5 // starting zoom
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