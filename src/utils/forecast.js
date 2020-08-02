
const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c41817b35537ca1eb75f86b20c45e1f6&query=' +latitude+ ',' +longitude+ '&units=m'  

    request({url , json:true} ,(error,{body}) => {
        if(error){
          callback('unable tyo connect to weather services !!!',undefined)
        }  else if(body.error){
          callback('What the fuck up',undefined)
        }  else{
           callback(undefined,body.current.weather_descriptions[0]+'  It is currenty  ' + body.current.temperature+'  It feels like ' + body.current.feelslike )
        }
    } )
}

module.exports = forecast


