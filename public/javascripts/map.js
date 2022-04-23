
// Initialize and add the map
function initMap() {
    // The location of Mega Silk Way
    const mega = { lat: 51.091170, lng: 71.406048 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: mega,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: mega,
        map: map,
    });
}

window.initMap = initMap;