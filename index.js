const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const app = express();
const port = process.env.PORT || 3000;

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

//Setting view engine to .ejs
app.set('view engine', 'ejs');
// Defying a views path
app.set('views', path.join(__dirname, 'views'));

//Middleware for retrieving POST forms
app.use(express.urlencoded({extended: true}))


// Home route
app.get('/', (req, res) => {
    res.render('home', {title: "Home"})
});


// Listening to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});