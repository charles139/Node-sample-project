const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

//Datebase connection
mongoose.connect(config.database , { useNewUrlParser: true });
//On connected
mongoose.connection.on('connected' , () => {
    console.log("Connected to database " + config.database);
});
//On error
mongoose.connection.on('error' , (err) => {
    console.log("Database error " + err);
});

const app = express();

const students = require('./routes/students');

//Port number
const port = 3000;

//Cors middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname , 'frontend')));

//Body parser middleware
app.use(bodyParser.json());

app.use('/students' , students);

//Index route
app.get('/' , (req , res) => {
    res.send("Invalid endpoint 139");
});

//Pages not found
app.get('*' , (req , res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

//Server listening on port {3000 in this case}
app.listen(port , () => {
    console.log("Server started on port " + port); 
});