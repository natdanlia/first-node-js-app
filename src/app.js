
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')



const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars enigne and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.get takes 2 arguments:
//  1,partial url or route
//  2, fuction, what we want to do when someone visits the route, what to send them back


app.get('', (req,res) => {
    res.render('index', {
        title: "aba fugera",
        sefer: "aba nega",
        name: "kocho"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "aba fugera",
        name: "aba nega"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        artist: "adele",
        title: "hello from the other side",
        album: 'Hello',
        name: 'adelelele'
    })
})


app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
            error: 'Your must provide an address'
        })
    }

    geocode(req.query.address, (error, { lattitude,longtiude,location } = {})=>{
        if(error){
            return res.send({
                error
            })
        } else{
            forecast(lattitude,longtiude, (error, data ) => {
                if (error){
                    return {
                        error
                    }
                } else{
                    res.send({
                        location,
                        forecast: data,
                        address: req.query.address
                    })
                }
            })
        }

    })
    
})









app.get('/products', (req,res)=>{
   if(!req.query.search){
      return res.send({
           error: "you must provide a search term"
       })
   }

   res.send([{
       products: []
   }])

})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        error: "help article not found",
        artist: "adele",
        title: "hello from the other side",
        album: 'Hello',
        name: 'adelelele'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        error: "my 404 page",
        artist: "adele",
        title: "hello from the other side",
        album: 'Hello',
        name: 'adelelele'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})