const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");



//View engine
app.set('view engine', 'ejs');

// static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Connected to database successfully!')
    }).catch((err) => {
    console.log(`error connecting database ${err}`);
})

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8080, () => {
    console.log("Server is running on port 8080!")
})