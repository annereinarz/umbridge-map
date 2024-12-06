var map = L.map('map').setView([0, 0], 2); // Centered globally

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load locations from CSV
Papa.parse('locations.csv', {
    download: true,
    header: true, // Treat the first row as column headers
    complete: function(results) {
        // Loop through each row in the CSV and add a marker
        results.data.forEach(function(row) {
            if (row.latitude && row.longitude && row.label) {
                var marker = L.marker([parseFloat(row.latitude), parseFloat(row.longitude)]).addTo(map);
                marker.bindPopup(row.label).openPopup();
            }
        });
    },
    error: function(error) {
        console.error("Error loading CSV:", error);
    }
});

// Add a marker when the map is clicked
map.on('click', function(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    var label = prompt("Enter a label for this location:");
    if (label) {
        marker.bindPopup(label).openPopup();
    }
});
