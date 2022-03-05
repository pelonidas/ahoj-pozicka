const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError')
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
//Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Home route
app.get('/', (req, res) => {
    res.render('home', {title: "Pozicky"})
});
// Refinancovanie route
app.get('/refinancovanie', (req, res) => {
    res.render('refinancovanie', {title: "Refinancovanie"})
})

app.get('/centrala', (req, res) => {

})
// Handling undefined routes
app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

// Listening to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});