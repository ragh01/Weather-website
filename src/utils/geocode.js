const request = require('request')


const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFnaC0xMDEyIiwiYSI6ImNrZDU0MzRrNjBjcjIyc3M4NTNlNm1tYm8ifQ.RGLc3eGUchIVy7DBro5Tqw&limit=1'
    
    request({url , json:true} , (error, {body} ) => {
      if(error){
        callback('unable to connect to weather services !!!',undefined)
      }  else if(body.features.length===0){
        callback('What the fuck up',undefined)
      }  else{
        callback(undefined , {
          latitude:  body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    } )
  }

  module.exports = geocode
