const express = require(`express`);

const app = express();

const bodyParser = require('body-parser');

const calculate = require(`./routes/calculate`);

const port = 5000;

app.use(express.static(`./server/public`));

app.use(bodyParser.urlencoded({extended: true}));

app.use(`/calculate`, calculate);

app.listen(port, (req, res) => {
    `Server is up on ${port}`;
});