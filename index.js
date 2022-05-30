const express = require('express');
const path = require('path');
const fs = require('fs');
const engine = require('ejs-mate');
const nodemailer = require('nodemailer')
const ExpressError = require('./utils/ExpressError')
let session = require('express-session')
const {checkData, checkHousing} = require('./public/javascripts/handleJob')
const multer = require('multer')
const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})



const uploadHandler = multer({storage: storageEngine})
const directory = path.join(__dirname, '/uploads');

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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
})
//Setting view engine to .ejs
app.set('view engine', 'ejs');
// Defying a views path
app.set('views', path.join(__dirname, 'views'));

//Middleware for retrieving POST forms
app.use(express.urlencoded({extended: true}))
//Serving static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules/semantic-ui-dropdown')))
app.use(express.static(path.join(__dirname, 'node_modules/semantic-ui-transition')))
app.use(express.static(path.join(__dirname, 'node_modules/autonumeric')))
app.use(express.static(path.join(__dirname, 'node_modules/mathjs')))
app.use('/uploads', express.static('uploads'));

app.use(session(sessionObject))

// Home route
app.get('/', (req, res) => {
    res.render('home', {title: "Best Pôžička - Jednoducha cesta k peniazom", isRefinancovanie: false})
});
// Refinancovanie route
app.get('/refinancovanie', (req, res) => {
    res.render('refinancovanie', {title: "Refinancovanie - Best Pôžička", isRefinancovanie: true})
})

app.get('/centrala', (req, res) => {
    res.render('centrala', {title: "Centrála - Best Pôžička"})
})

app.get('/dofinancovanie', (req, res) => {
    res.render('dofinancovanie', {title: "Dofinancovanie hypoték - Best Pôžička"})
})

app.get('/o-best-pozicke', (req, res) => {
    res.render('about', {title: "O best pôžičke - Best Pôžička"})
})

app.get('/kontakt', (req, res) => {
    res.render('contact', {title: "Kontakt - Best Pôžička"})
})

app.get('/form/rejected', (req, res) => {
    res.render('form/req-rejected', {formData})
})

app.get('/form/step-1', (req, res) => {
    res.render('form/index', {step: 1, formData})
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

app.get('/form/step-5', async (req, res) => {
    res.render('form/step5', {step: 5, formData})
})

app.get('/form/success', (req, res) => {
    res.render('form/form-success')
})

app.post('/form/step-2', (req, res) => {
    formData.companyData = req.body

    res.redirect('/form/step-3')
})
app.post('/form/step-4', uploadHandler.fields([
    {name: 'frontId', maxCount: 1},
    {name: 'backId', maxCount: 1},
]), (req, res) => {

    formData.attachments = req.files
    console.log(formData.attachments.frontId[0])
    return res.redirect('/form/step-5')
})
app.post('/form/step-3', (req, res) => {
    formData.customerData = req.body
    checkHousing(formData)

    res.redirect('/form/step-4')
})

app.post('/form/step-5', async (req, res) => {
    formData.bankData = req.body
    const output = `
     <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Záujem o: <b></b>, na <b></b> a mesačnou splátkou <b></b></li>
                   <li>Meno a priezvisko <b>${formData.contact.fName}</b> <b>${formData.contact.lName}</b></li>
                   <li>Telefónne číslo: <b>${formData.contact.phoneNum}</b></li>
                   <li>Email: <b>${formData.contact.email}</b></li>
                   <li>Pracovné zaradenie: <b>${formData.contact.job}</b></li>
                   <li>Rodné číslo: <b>${formData.contact.bNumber}</b></li>
                   <li>Číslo OP: <b>${formData.contact.id}</b></li>
                   <li>Názov spločnosti alebo IČO: <b>${formData.companyData.companyName}</b></li>
                   <li>Obec: <b>${formData.companyData.city}</b></li>
                   <li>Zamestanine na dobu: <b>${formData.companyData.period}</b></li>
                   <li>Od do: <b>${formData.companyData.from}</b>-<b>${formData.companyData.till}</b></li>
                   <li>Vedľajšie príjmy príjmy: <b>${formData.companyData.sideIncome}</b></li>
             </ul>
     <h3>Trvalý pobyt</h3>
             <ul>
                   <li>Ulica a popisné číslo: ${formData.customerData.personStreet}</li>
                   <li>Obec: <b>${formData.customerData.cityCustomer}</b></li>
                   <li>PSČ: <b>${formData.customerData.pscCustomer}</b></li>
                   <li>Typ bývania: <b>${formData.customerData.housing}</b></li>
                   <li>Poštu chcem dostávať na: <b>${formData.customerData.postStreet}</b>, <b>${formData.customerData.postCity}</b>, <b>${formData.customerData.postPsc}</b></li>
             </ul>
     <h3>Rodné priezvisko matky</h3>
             <ul>
                   <li>Rodné priezvisko matky: <b>${formData.customerData.motherSurname}</b></li> 
            </ul>
     <h3>Účet</h3>
             <ul>
                    <li>IBAN: </li>
                    <li>Názov banky:</li>
                    <li>Predčíslie účtu:</li>
                    <li>Číslo účtu:</li>
                    <li>Spôsob splácania: </li>
             </ul>
`
    let transporter = nodemailer.createTransport({
        host: "smtp.m1.websupport.sk",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@dpmg.dev', // generated ethereal user
            pass: 'Lx4:Vd@JB4', // generated ethereal password
        },
    });

    await transporter.sendMail({
        from: '"Best Pôžičky" <test@dpmg.dev>', // sender address
        to: `banik.anton@gmail.com`, // list of receivers
        subject: "Nová správa z webovej stránky", // Subject line
        text: "Hello world?", // plain text body
        html: output,
        attachments: [
            {
                filename: formData.attachments.frontId[0].filename,
                path: __dirname + '/' + formData.attachments.frontId[0].path,
            },
            {
                filename: formData.attachments.backId[0].filename,
                path: __dirname + '/' + formData.attachments.backId[0].path,
            }
        ]// html body
    });

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });

    res.redirect('/form/success')
})

app.post('/form/step-1', async (req, res) => {
    formData.contact = req.body;
    if (formData.contact.job === 'student' || formData.contact.job === 'maternity' || formData.contact.job === 'home-person' || formData.contact.job === 'unemployed') {
        return res.redirect('/form/rejected')
    }
    checkData(formData)
    let output = `
          <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Záujem o: <b></b>, na <b></b> a mesačnou splátkou <b></b></li>
                   <li>Meno a priezvisko <b>${formData.contact.fName}</b> <b>${formData.contact.lName}</b></li>
                   <li>Telefónne číslo: <b>${formData.contact.phoneNum}</b></li>
                   <li>Email: <b>${formData.contact.email}</b></li>
                   <li>Pracovné zaradenie: <b>${formData.contact.job}</b></li>
                   <li>Rodné číslo: <b>${formData.contact.bNumber}</b></li>
                   <li>Číslo OP: <b>${formData.contact.id}</b></li>
             </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.m1.websupport.sk",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@dpmg.dev', // generated ethereal user
            pass: 'Lx4:Vd@JB4', // generated ethereal password
        },
    });

    await transporter.sendMail({
        from: '"Best Pôžičky" <test@dpmg.dev>', // sender address
        to: `jan.nahalka348@gmail.com`, // list of receivers
        subject: "Nová správa z webovej stránky", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    res.redirect('/form/step-2')
})

app.post('/form', async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.m1.websupport.sk",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@dpmg.dev', // generated ethereal user
            pass: 'Lx4:Vd@JB4', // generated ethereal password
        },
    });

    const data = req.body

    let output;

    if (data.interest) {
        output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Mám záujem o: <b>${data.interest}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
    } else {
        output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
    }
    //banik.anton@gmail.com
    // // send mail with defined transport object
    await transporter.sendMail({
        from: '"Best Pôžičky" <test@dpmg.dev>', // sender address
        to: `jan.nahalka348@gmail.com`, // list of receivers
        subject: "Nová správa z webovej stránky", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });
    res.redirect('/form/dakujeme')
})

app.post('/calc', (req, res) => {
    formData.calcData = req.body

    res.redirect('/form/step-1')
})

app.get('/form/dakujeme', (req, res) => {
    res.render('form/form-dakujeme')
})
// Listening to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
