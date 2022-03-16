const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const nodemailer = require('nodemailer')
const ExpressError = require('./utils/ExpressError')
let session = require('express-session')
const {checkData} = require('./public/javascripts/handleJob')

const app = express();
const port = process.env.PORT || 3000;
let formData = {};

const sessionObject = {
    name: 'session',
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

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

app.use(session(sessionObject))

// Home route
app.get('/', (req, res) => {
    res.render('home', {title: "Pozicky"})
});
// Refinancovanie route
app.get('/refinancovanie', (req, res) => {
    res.render('refinancovanie', {title: "Refinancovanie"})
})

app.get('/centrala', (req, res) => {
    res.render('centrala', {title: "Centrala"})
})

app.get('/dofinancovanie', (req, res) => {
    res.render('dofinancovanie', {title: "Dofinancovanie hypotek"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "O best pozicke"})
})

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Kontakt"})
})

app.get('/form/rejected', (req, res) => {
    res.render('form/req-rejected')
})

app.get('/form/step-1', (req, res) => {
    res.render('form/index', {step: 1})
})

app.get('/test', (req, res) => {
    res.render('test')
})

app.get('/form/step-2', (req, res) => {
    res.render('form/step2', {step: 2, formData})
})

app.get('/form/step-3', (req, res) => {
    res.render('form/step3', {step: 3, formData})
})

app.get('/form/step-4', (req, res) => {
    res.render('form/step4', {step: 4, formData})
})

app.get('/form/success', (req, res) => {
    res.render('form/form-success')
})

app.post('/form/step-2', (req, res) => {
    const companyData = req.body;
    formData.companyName = companyData.companyName

    console.log(formData)
    req.session.sessionFormData = formData;

    res.redirect('/form/step-3')
})

app.post('/form/step-3', (req, res) => {
    const personData = req.body
    formData.street = personData.street;

    console.log(formData)
    req.session.sessionFormData = formData;
    res.redirect('/form/step-4')
})

app.post('/form/step-1', async (req, res) => {
    formData = req.body;
    if (formData.job === 'student' || formData.job === 'maternity' || formData.job === 'home-person' || formData.job === 'unemployed') {
        return res.redirect('/form/rejected')
    }
    checkData(formData)
    const output = `
        <h3>Contact details</h3>
        <ul>
            <li>Name: <b>${formData.fName}</b></li>
            <li>Surname: <b>${formData.lName}</b></li>
            <li>Rodne cislo: <b>${formData.bNumber}</b></li>
            <li>Telefonne cislo: <b>${formData.phoneNum}</b></li>
            <li>Číslo občianského preukazu: <b>${formData.id}</b></li>
            <li>Email: <b>${formData.email}</b></li>
            <li>Tvoje pracovné zaradenie: <b>${formData.job}</b></li>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: "mail.websupport.sk",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'test01@mail.dpmarketing.sk', // generated ethereal user
            pass: 'Webtestemail123!', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Test Person" <test01@mail.dpmarketing.sk>', // sender address
        to: `test01@mail.dpmarketing.sk, `, // list of receivers
        subject: "Personal info", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    req.session.sessionFormData = formData
    res.redirect('/form/step-2')
})
// Handling undefined routes
// app.all('*', (req, res, next) => {
//     next(new ExpressError("Page not found", 404))
// })

// Listening to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});