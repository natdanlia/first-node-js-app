const request = require('request')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibmF0ZGFubG92ZSIsImEiOiJjanpmbWFqOWowY3diM2JvMzF3cmN0aGcxIn0.scypIWyv5j34-U-U4OoWJQ&limit=1`


    request({ url, json: true }, (error, {body} = {}) => {
        

       
      
        if (error) {
          callback('unable to connect to locations services!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location try another search', undefined)

        } else {
            

            const lattitude = body.features[0].center[1]
            const longtiude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
               lattitude,
               longtiude,
               location
            })
        }

    })
    

}


module.exports = geocode
