// Initialize the map
var map = L.map('map').setView([0, 0], 2); // Centered globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker when the map is clicked
map.on('click', function(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    var label = prompt("Enter a label for this location:");
    if (label) {
        marker.bindPopup(label).openPopup();
    }
});
