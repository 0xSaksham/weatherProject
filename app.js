const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = ""; // Enter your own API key from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The Current Temperature is: ${temp} deg C</h1>`);
      res.write(`<p>The Weather is Currently ${description}</p>`);
      res.write(`<img src =${imageURL}>`);
      res.send();
    });
  });
}); 

app.listen(3000, () => {
  console.log("Server is Running at port 3000");
});
