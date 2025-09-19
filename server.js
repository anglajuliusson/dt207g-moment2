const express =  require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

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

    if ( !companyname || !jobtitle || !location || !startdate || !enddate ) { // Kontroll att allt skickas med
        res.json({error: "Alla uppgifter måste skickas med!"}) // Felmeddelande om någon information saknas
    }

    res.json({message: "Work experiences added"});
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