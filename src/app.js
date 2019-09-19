const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialDirectoryPath = path.join(__dirname, '../templates/partials')
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialDirectoryPath)
//Using handle bars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        createdBy: 'Harsha'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'harsha',
        age: '25',
        createdBy: 'Harsha'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        createdBy: 'Harsha'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help page not found',
        title: '404',
        createdBy: 'Harsha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error == undefined) {

            forecast(latitude, longitude, (error, { temperature, rainPrediction, summary } = {}) => {
                if (error == undefined) {  
                    forecastSummary= summary+'. It is currently '+temperature+' degress out there, There is '+rainPrediction+'% chance of rain'          
    console.log(summary, '.It is currently', temperature, 'degress out, There is', rainPrediction, '% chance of rain')
                    res.send({
                        forecast: forecastSummary,
                        location: location,
                        temperature: temperature,
                        rainPrediction: rainPrediction
                    })
                } else {
                    res.send({ error });
                }


            })

        } else {
            console.log("error n appjs")
            return res.send({ error });
        }


    })

})
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found',
        title: '404',
        createdBy: 'Harsha'
    })
})




app.listen(3000, () => {
    console.log("Server is running on 3000 port")
});
