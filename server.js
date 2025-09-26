const express =  require('express');
const cors = require('cors'); // Inkludera cors
const mysql = require('mysql2'); // Inkludera mysql
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
        return; // Om felmeddelande stoppa koden
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
    
    // Get work experinces
    connection.query('SELECT * FROM works;', (err, results) => {
        if (err) {
            res.status(500).json({error: "Something went wrong: " + err});

            return; // Om felmeddelande stoppa koden
        }

        console.log(results); // Skriv ut lagrade värden i tabellen
        if (results.length === 0) {
            res.status(200).json({message: "No work experiences found"}); // Om tom tabell
        } else {
            res.json(results); // Skriv ut tabellens innehåll om det finns
        }
    });
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

    // Add work experience to database
    connection.query('INSERT INTO works(companyname, jobtitle, location, startdate, enddate) VALUES (?, ?, ?, ?, ?);', [companyname, jobtitle, location, startdate, enddate], (err, results) => {
        if (err) {
            res.status(500).json({error: "Something went wrong: " + err});

            return; // Om felmeddelande stoppa koden
        }

        console.log("Fråga skapad: " + results);
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
});

// Uppdatera
app.put("/api/work_experiences/:id", (req, res) => {
    const {id} = req.params;
    const {companyname, jobtitle, location, startdate, enddate} = req.body;

    connection.query("UPDATE works SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?",
        [companyname, jobtitle, location, startdate, enddate, id],
        (err, results) => {
            if (err) {
                res.status(500),json({error: "Something went wrong: " + err});
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({message: 'No work experence found whit id ${id}'});
                return;
            }
            res.json({message: "Work experiences updated: " + req.params.id});
        }
    );
});

// Radera
app.delete("/api/work_experiences/:id", (req, res) => {
    const {id} = req.params;

    connection.query("DELETE FROM works WHERE id=?", [id], (err, results) => {
        if (err) {
            res.status(500).json({error: "Something went wrong: " + err});
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({message: 'No work experience found with id ${id}'});
        }
        res.json({message: "Work experiences deleted: " + req.params.id});
    });
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});