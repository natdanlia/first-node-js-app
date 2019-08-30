const request = require('request')

const forecast = (lattitude, longtiude, callback) => {

    const url = `https://api.darksky.net/forecast/4b2e55ee5ed087c4b835f9c85dfd5ab3/${lattitude}, ${longtiude}`

    request({  url, json: true }, (error, {body}) => {
       
        if (error) {
            callback('Could not connect forecast services')
        } else if (body.error) {
            callback('Wrong longtiude and lattitude')
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} and feels like ${body.currently.apparentTemperature} `)
            
        }
    })
}

module.exports = forecast;