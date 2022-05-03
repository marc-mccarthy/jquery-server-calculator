// stores and requires the Express Server node module
const express = require(`express`);

// create an app variable to hold the 
const app = express();

// stores bodyParser and allows the POST module to store the request data in an object
const bodyParser = require('body-parser');

// stores the calculate.js script in a variable from this route
const calculate = require(`./routes/calculate`);

// current server port number
const port = process.env.PORT || 5000;

// sets this route as the default route for Express to serve files
app.use(express.static(`./server/public`));

// allows us to parse the url with the extended option being true
app.use(bodyParser.urlencoded({extended: true}));

// mounts the route calculate to be used as middleware
app.use(`/calculate`, calculate);

// logs on server run to show us this string with port number
app.listen(port, (req, res) => {
    `Server is up on ${port}`;
});