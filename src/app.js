const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

//define paths
const public_dir_path = path.join(__dirname,'../public')
const views_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

//setup handlebars
app.set('view engine' , 'hbs')
app.set('views',views_path)
hbs.registerPartials(partials_path)

//setup static directory
app.use(express.static(public_dir_path))

app.get('' , (req,res) => {
    res.render('index',{
        title: 'my webpage',
        name: 'Raghav Mittal'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title: 'Again about',
        name: 'Raghav Mittal'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title: 'Its Help this time',
        name: 'Raghav Mittal'
    })
})
    
app.get('/weather', (req,res) => {
        const address =  req.query.search
        if(!req.query.search){
            return res.send({
                error:'YOU must PRovide an address'
            })
        }

        geocode(address, (error,{latitude,longitude,location} = {}) => {
            if(error) {
              return res.send({
                  error
              })
            }
            forecast(latitude,longitude, (error, forecastdata) => {
              if(error) {
                return res.send({
                    Error: error
                })
              }
              res.send({
                location: location,
                data: forecastdata,
                address: address
              })
            })
          }) 
})

app.get('/help/*', (req,res) => {
    res.render('errors',{
        title:'404',
        error:'Help article not found',
        name:'Raghav Mittal'
    })
})

app.get('*', (req,res) => {
    res.render('errors',{
        title:'404',
        error:'Page Not Found',
        name:'Raghav Mittal'
    })
})


app.listen(3000 , () => {
    console.log('server is up and running on port 3000')
})

console.log(__dirname)
console.log(public_dir_path)