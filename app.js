
const express = require('express')
const bodyparser = require('body-parser')
const ejs = require('ejs')
const https = require('https')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended : true}))
app.use(express.static("public"))
app.set("view engine","ejs")


app.get('/',(req,res)=>{

    const today = new Date()
    const options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    }
    const day = today.toLocaleDateString('en-US',options)


    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=[API-key]'
    https.get(url,(response)=>{

        response.on('data',(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const humid = weatherData.main.humidity
            const des = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const wind = weatherData.wind.speed
            const prep = weatherData.clouds.all
            const iconLink = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
            res.render('index',{day : day,temp : temp,humid : humid,des : des,iconLink : iconLink,wind : wind,prep : prep })

        })
    })
})

app.get('/loc/:custom',(req,res)=>{
    const name = req.params.custom

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+name+'&[API-key]&units=metric'

    const today = new Date()
    const options = {
    weekday : 'long',
    day : 'numeric',
    month : 'long'
}
    const day = today.toLocaleDateString('en-US',options)


    https.get(url,(response)=>{

    response.on('data',(data)=>{
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const humid = weatherData.main.humidity
        const des = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const wind = weatherData.wind.speed
        const prep = weatherData.clouds.all
        const iconLink = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
        res.render('custom',{day : day,temp : temp,humid : humid,des : des,iconLink : iconLink,wind : wind,location : name,prep : prep })

    })
})
})

app.post('/',(req,res)=>{
    let location = req.body.loc


    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&[API-key]&units=metric'

    const today = new Date()
    const options = {
    weekday : 'long',
    day : 'numeric',
    month : 'long'
}
    const day = today.toLocaleDateString('en-US',options)


    https.get(url,(response)=>{

    response.on('data',(data)=>{
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const humid = weatherData.main.humidity
        const des = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const wind = weatherData.wind.speed
        const prep = weatherData.clouds.all
        const iconLink = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
        res.render('location',{day : day,temp : temp,humid : humid,des : des,iconLink : iconLink,wind : wind,location : location,prep : prep, })
    })
})


})

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})

