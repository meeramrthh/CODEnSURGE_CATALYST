const map = L.map('map').setView([51.505, -0.09], 2); // Set a global view for more locations

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// API key and endpoint
const apiKey = '42f1f8b590d34477927383860e04c5af'; // Your actual API key
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=50&apiKey=${apiKey}`; // Increased pageSize to 50

// Expanded coordinates for plotting
const sampleCoordinates = [
    { lat: 51.505, lon: -0.09 },    // London
    { lat: 40.7128, lon: -74.0060 }, // New York
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 48.8566, lon: 2.3522 },    // Paris
    { lat: 35.6895, lon: 139.6917 },  // Tokyo
    { lat: 55.7558, lon: 37.6173 },   // Moscow
    { lat: -33.8688, lon: 151.2093 }, // Sydney
    { lat: -23.5505, lon: -46.6333 }, // São Paulo
    { lat: 19.4326, lon: -99.1332 },  // Mexico City
    { lat: 39.9042, lon: 116.4074 },  // Beijing
    { lat: 37.7749, lon: -122.4194 }, // San Francisco
    { lat: 28.6139, lon: 77.2090 },   // New Delhi
    { lat: 52.5200, lon: 13.4050 },   // Berlin
    { lat: 41.9028, lon: 12.4964 },   // Rome
    { lat: 19.0760, lon: 72.8777 },   // Mumbai
    { lat: 43.651070, lon: -79.347015 }, // Toronto
    { lat: -1.2921, lon: 36.8219 },   // Nairobi
    { lat: -34.6037, lon: -58.3816 }, // Buenos Aires
    { lat: 33.6844, lon: 73.0479 },   // Islamabad
    { lat: 25.276987, lon: 55.296249 }, // Dubai
    // Additional locations
    { lat: 40.730610, lon: -73.935242 }, // New York City
    { lat: 51.1657, lon: 10.4515 },      // Germany
    { lat: 39.1037, lon: -84.5120 },     // Cincinnati
    { lat: 55.9533, lon: -3.1883 },      // Edinburgh
    { lat: 59.9343, lon: 30.3351 },      // Saint Petersburg
    { lat: 43.0389, lon: -87.9065 },     // Milwaukee
    { lat: 39.7392, lon: -104.9903 },    // Denver
    { lat: 47.6062, lon: -122.3321 },    // Seattle
    { lat: 40.4406, lon: -79.9959 },     // Pittsburgh
    { lat: 45.4215, lon: -75.6972 },     // Ottawa
    { lat: 42.3601, lon: -71.0589 },     // Boston
    { lat: 41.8781, lon: -87.6298 },     // Chicago
    { lat: 34.0522, lon: -118.2437 },    // Los Angeles
    { lat: 33.4484, lon: -112.0740 },    // Phoenix
    { lat: 36.1627, lon: -86.7816 },     // Nashville
    { lat: 38.8951, lon: -77.0369 },     // Washington D.C.
    { lat: 32.7157, lon: -117.1611 },    // San Diego
    { lat: 30.6954, lon: -88.0399 },     // Mobile
    { lat: 42.3314, lon: -83.0458 },     // Detroit
    { lat: 35.2271, lon: -80.8431 },     // Charlotte
    { lat: 29.7604, lon: -95.3698 },     // Houston
    { lat: 38.6270, lon: -90.1994 },     // St. Louis
    { lat: 41.2565, lon: -95.9345 },     // Omaha
    { lat: 32.7767, lon: -96.7970 },     // Dallas
    { lat: 43.6532, lon: -79.3832 },     // Toronto
    { lat: 47.6062, lon: -122.3321 },    // Seattle
    { lat: 36.1699, lon: -115.1398 },    // Las Vegas
    { lat: 39.0997, lon: -94.5786 },     // Kansas City
    { lat: 43.0481, lon: -76.1474 },     // Syracuse
    { lat: 39.9612, lon: -82.9988 },     // Columbus
    { lat: 45.5122, lon: -122.6587 },    // Portland
    { lat: 38.8951, lon: -77.0369 },     // Washington D.C.
    { lat: 47.6062, lon: -122.3321 }     // Seattle
];

// Fetch news data from the API and update the map
function updateMapWithNews() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // to Check the API response

            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for each news article
            data.articles.forEach((article, index) => {
                console.log(article); // Check each article

                // Cycle through the sample coordinates
                const { lat, lon } = sampleCoordinates[index % sampleCoordinates.length]; 

                if (lat && lon) { 
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`
                            <b>${article.title}</b><br>
                            ${article.description}<br>
                            <a href="${article.url}" target="_blank">Read more</a>
                        `);
                }
            });
        })
        .catch(error => console.error('Error fetching news data:', error));
}

// Call the function to fetch news data initially
updateMapWithNews();

// Refresh the news data every 5 minutes
setInterval(updateMapWithNews, 300000); // 300000 milliseconds = 5 minutes converted
