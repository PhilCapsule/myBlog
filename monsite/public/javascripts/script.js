var map = L.map('map',{
    center: [48.866667, 2,333333],
    zoom: 4,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);


var cities = document.getElementsByClassName('list-group-item');

var customIcon = L.icon({
    iconUrl: '../images/leaf-green.png',
    shadowUrl: '../images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


for(let i=0;i<cities.length;i++){
    var lon = cities[i].dataset.lon
    var lat = cities[i].dataset.lat
    var cityname = cities[i].dataset.cityname

    L.marker([lat,lon], {icon: customIcon}).addTo(map).bindPopup(cityname)
}

 









