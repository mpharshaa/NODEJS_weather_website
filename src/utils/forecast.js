const request = require('request');

const forecast = (latitude,longitude, callback) => {
    url = 'https://api.darksky.net/forecast/ed23da7ddb1c742606f57319377ba597/' + latitude + ',' + longitude + '?units=auto'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect darksky server', undefined);
        } else if (body.error) {
            callback('unable to find the forecast,please try another', undefined)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rainPrediction: body.currently.precipProbability,
                summary:body.currently.summary,
                windSpeed:body.currently.windSpeed
            })
        }
    })
}

module.exports = forecast;
