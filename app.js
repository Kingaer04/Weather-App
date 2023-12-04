const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req,res){

    res.sendFile(`${__dirname}/index.html`)

})

app.post("/", (req, res)=>{
    const cityName = req.body.cityname;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cfdde0d19271f4b821913fe51712ea0c`
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            // console.log(weatherData)
            let temp = weatherData["main"]["temp"];
            let description = weatherData["weather"][0]["description"];
            let icon = weatherData["weather"][0]["icon"];
            let imageurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<p>The weather is currently ${description}</p>`);
            res.write(`<h1>The temperature in ${cityName} is ${temp} degrees Celcius</h1>`);
            res.write(`<img src=${imageurl}>`)
            res.send();
        })
    })

})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
