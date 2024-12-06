// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 3);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load CSV file and parse
fetch('locations.csv')
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                results.data.forEach(row => {
                    const lat = parseFloat(row.Latitude);
                    const lon = parseFloat(row.Longitude);
                    const label = row.Label || 'No Label';

                    if (!isNaN(lat) && !isNaN(lon)) {
                        L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(`<strong>${label}</strong>`);
                    } else {
                        console.error('Invalid location:', row);
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error loading CSV:', error));
