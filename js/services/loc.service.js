import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    getPosOnMapClicked
}
var gNextId = 101
const STORAGE_KEY = 'locationDB'

const locs = []


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getPosOnMapClicked(ev) {
    let pos = ev.latLng.toJSON()

    var location = {
        id: gNextId++,
        name: 'Greatplace',
        lat: pos.lat,
        lng: pos.lng,
        // weather,
        // updatedAt,
    }
    locs.push(location)
    console.log(locs);
    _saveLocsToStorage(locs)
}



function _saveLocsToStorage(location) {
    storageService.saveToStorage(STORAGE_KEY, locs)
}