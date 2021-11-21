const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

//View engine
app.set('view engine', 'ejs');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.listen(8080, () => {
    console.log("Server is running on port 8080!")
})