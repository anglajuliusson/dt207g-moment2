const express =  require('express');
const app = express();
const port = process.env.PORT || 3000;

// Routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get("/api/work_experiences", (req, res) => {
    res.json({message: "Get work experiences"});
});

app.get("/api/work_experiences", (req, res) => {
    res.json({message: "Get work experiences"});
});

app.post("/api/work_experiences", (req, res) => {
    res.json({message: "Work experiences added"});
});

app.put("/api/work_experiences/:id", (req, res) => {
    res.json({message: "Work experiences updated:" + req.parmans.id});
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});