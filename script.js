const map = L.map('map').setView([51.505, -0.09], 3);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to load and process the CSV file
fetch('locations.csv')
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                results.data.forEach(row => {
                    const { Latitude, Longitude, Label, Links } = row;
                    const lat = parseFloat(Latitude);
                    const lon = parseFloat(Longitude);

                    if (!isNaN(lat) && !isNaN(lon)) {
                        // Split links into an array
                        const linksArray = Links.split(';').map(link => link.trim());

                        // Create HTML for multiple links
                        const linksHTML = linksArray
                            .map(link => `<a href="${link}" target="_blank">${link}</a>`)
                            .join('<br>');

                        // Create a popup with label and multiple links
                        const popupContent = `
                            <strong>${Label}</strong><br>
                            ${linksHTML}
                        `;

                        // Add a marker with the popup
                        L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(popupContent);
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error loading CSV:', error));
