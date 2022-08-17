import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
}


// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.954567, lng = 35.0938551) {
    // console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
           return gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
        .then((map) => {
            map.addListener("click", (mapsMouseEvent) => {
                locService.getPosOnMapClicked(mapsMouseEvent)
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBy0xz2MmQf1eMfcFvkVZ5Py8HHtu1Ykbs' //DONE: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}