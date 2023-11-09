let map, directionsService, directionsRenderer, autocompleteStart, autocompleteEnd;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    autocompleteStart = new google.maps.places.Autocomplete(document.getElementById('start'));
    autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById('end'));

    document.getElementById('calculate-route').addEventListener('click', calculateAndDisplayRoute);
}

function calculateAndDisplayRoute() {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            displayETA(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function displayETA(response) {
    // Assuming driving speed is constant and there's no traffic, delays, etc.
    const route = response.routes[0];
    const duration = route.legs[0].duration;
    document.getElementById('eta-value').textContent = duration.text;
}

// Initialize the map script
initMap();
