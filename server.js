const express =  require('express');
const cors = require('cors'); // Inkludera cors
const mysql = require('mysql'); // Inkludera mysql
require('dotenv').config(); // Inkludera env variabler

const app = express();
const port = process.env.PORT || 3000;

// Anslutning till databas
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed: " + err);
    }

    console.log("Connected to database");
});

app.use(cors()); // Inkludera cors i express-applikationen
app.use(express.json()); // Sidan ska kunna ta emot JSON-data

// Routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get("/api/work_experiences", (req, res) => {
    res.json({message: "Get work experiences"});
});

// Addera
app.post("/api/work_experiences", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    // error handling
    let errors = {
        message: "",
        detail: "",
        http_response: {

        }
    };

    if ( !companyname || !jobtitle || !location || !startdate || !enddate ) { // Kontroll att allt skickas med
        // error messages
        errors.message = "Companyname, jobtitle, location, startdate and enddate not included";
        errors.detail = "You must include companyname, jobtitle, location, startdate and enddate in JSON";

        // respone code
        errors.http_response.message = "Bad Request";
        errors.http_response.code = 400;

        res.status(400).json(errors);

        return; // Om felmeddelande stoppa koden
    } 

    // Objekt
    let work = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate
    }

    res.json({message: "Work experiences added", work}); // Skicka med objekt om korrekt skickad data
});

// Uppdatera
app.put("/api/work_experiences/:id", (req, res) => {
    res.json({message: "Work experiences updated: " + req.params.id});
});

// Radera
app.delete("/api/work_experiences/:id", (req, res) => {
    res.json({message: "Work experiences deleted: " + req.params.id});
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});