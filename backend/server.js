const express = require("express");
const bodyParser = require('body-parser');
// create express app
const app = express();
const cors = require('cors')
app.use(function (req, res, next) {
 
 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    next();
    });
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

//define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "welcome to car cleaning application" });

});
//Require Notes Routes
require('../backend/route/registration.route.js');
// listen for requests
app.listen(3000, () => {
    console.log(" Server is Listening on the port 3000");
})
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(() => {
    console.log("Could not connect to the database");
    process.exit();
});