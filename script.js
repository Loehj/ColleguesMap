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

//AIzaSyCB9hknU7PSlF - QWr_Kj6nbiBvHImQ - hvI
/*uploadFile("1Q7pmVcDqZzdd6Z1djrY4qzNSn_MIqpVU", place);
function uploadFile(id, text) {
    var auth_token = gapi.auth.getToken().access_token;

    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var metadata = {
        description: 'savefile for my game',
        'mimeType': 'application/json'
    };

    var multipartRequestBody =
        delimiter + 'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter + 'Content-Type: application/json\r\n\r\n' +
        text +
        close_delim;

    gapi.client.request
        ({
            'path': '/upload/drive/v3/files/' + id,
            'method': 'PATCH',
            'params': { 'fileId': id, 'uploadType': 'multipart' },
            'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
            'body': multipartRequestBody
        }).execute(function (file) { console.log("Wrote to file " + file.name + " id: " + file.id); });
}
*/
function pufunc() {
    new mapboxgl.Marker()
        .setLngLat(pos)
        .addTo(map);
    popup.remove();
}