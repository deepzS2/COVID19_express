const express = require("express");
const faker = require("faker");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 5000;

// Components
const covidData = require('./components/takeCovidData');

// EJS engine
app.set("view engine", "ejs");
app.use(expressLayouts);

// Requisitions parser
app.use(bodyParser.urlencoded());

// Public folder
app.use(express.static(__dirname + "/public"));

// Routes
app.get("/", async (req, res) => {
    const countries = await covidData();
    res.render("pages/home", {
        countries
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.get("/country", (req, res) => {
    res.render("pages/countries");
});

app.get("/country/:id", async (req, res) => {
    const country = await covidData(req.params.id);
    res.render("pages/country", {
        country
    });
});

// Listen
app.listen(port, () => {
    console.log(`Da magic happens on http://localhost:${port}`);
});