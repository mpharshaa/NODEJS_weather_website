const request = require('request');

const geocode = (address, callback) => {
    console.log(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFsbGltYWxhIiwiYSI6ImNrMG0xa2tjeDEyaHkzYm9jMGhqdnRqODgifQ._g8-AaPjH4F23GQiNddT2w'
    request({ url, json: true }, (error, {body}) => {

        if (error) {
            console.log("11")
            console.log("In geocode",error)
            callback('unable to connect geocode server', undefined);
        } else if (body.features.length === 0) {
            console.log("22")
            callback('unable to find location,Please try another location', undefined);
        } else {
            console.log("33")
            // console.log(response.body.features)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;