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
app.use(express.static(path.join(__dirname, 'node_modules/semantic-ui-dropdown')))
app.use(express.static(path.join(__dirname, 'node_modules/semantic-ui-transition')))
app.use(express.static(path.join(__dirname, 'node_modules/autonumeric')))
app.use(express.static(path.join(__dirname, 'node_modules/mathjs')))

app.use(session(sessionObject))

app.get('/test', (req, res) => {
    res.render('test')
})

// Home route
app.get('/', (req, res) => {
    res.render('home', {title: "Pozicky", isRefinancovanie: false})
});
// Refinancovanie route
app.get('/refinancovanie', (req, res) => {
    res.render('refinancovanie', {title: "Refinancovanie", isRefinancovanie: true})
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

app.get('/form/success', (req, res) => {
    res.render('form/form-success')
})

app.post('/form/step-2', (req, res) => {
    formData.companyData = req.body

    res.redirect('/form/step-3')
})
app.post('/form/step-4', async (req, res) => {
    // const output = `
    //     <h3>Contact details</h3>
    //     <ul>
    //         <li>Name: <b>${formData.contact.fName}</b></li>
    //         <li>Surname: <b>${formData.contact.lName}</b></li>
    //         <li>Rodne cislo: <b>${formData.contact.bNumber}</b></li>
    //         <li>Telefonne cislo: <b>${formData.contact.phoneNum}</b></li>
    //         <li>Číslo občianského preukazu: <b>${formData.contact.id}</b></li>
    //         <li>Email: <b>${formData.email}</b></li>
    //         <li>Tvoje pracovné zaradenie: <b>${formData.contact.job}</b></li>
    //     </ul>
    //     <h3>Company data</h3>
    //     <ul>
    //         <li>Company name: ${formData.companyData.companyName}</li>
    //         <li>ICO: ${formData.companyData.ico}</li>
    //         <li>Company city: ${formData.companyData.city}</li>
    //         <li>PSC: ${formData.companyData.psc}</li>
    //
    //         <ul>
    //         Last three months:
    //            <li>${formData.companyData.january}</li>
    //            <li>${formData.companyData.february}</li>
    //            <li>${formData.companyData.march}</li>
    //         </ul>
    //     </ul>
    //     <h3>Person data</h3>
    //     <ul>
    //         <li>Ulica: ${formData.customerData.street}</li>
    //         <li>Obec: ${formData.customerData.cityCustomer}</li>
    //         <li>PSC: ${formData.customerData.pscCustomer}</li>
    //         <li>Typ byvania: ${formData.customerData.living}</li>
    //         <li>Rodne priezvisko mamy: ${formData.customerData.motherSurname}</li>
    //     </ul>
    // `;
    //
    // let transporter = nodemailer.createTransport({
    //     host: "mail.websupport.sk",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'test01@mail.dpmarketing.sk', // generated ethereal user
    //         pass: 'Webtestemail123!', // generated ethereal password
    //     },
    // });
    //
    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: '"Test Person" <test01@mail.dpmarketing.sk>', // sender address
    //     to: `test01@mail.dpmarketing.sk, `, // list of receivers
    //     subject: "Personal info", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: output, // html body
    // });
    //
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.redirect('/form/success')
})
app.post('/form/step-3', (req, res) => {
    formData.customerData = req.body
    res.redirect('/form/step-4')
})

app.post('/form/step-1', async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.m1.websupport.sk",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@dpmg.dev', // generated ethereal user
            pass: 'Lx4:Vd@JB4', // generated ethereal password
        },
    });
    formData.contact = req.body;

    if (formData.contact.job === 'student' || formData.contact.job === 'maternity' || formData.contact.job === 'home-person' || formData.contact.job === 'unemployed') {
        return res.redirect('/form/rejected')
        // res.send('hi')
    }
    checkData(formData)
    let output = `
          <h3>Údaje z kontaktného formuláru</h3>
          <ul>
             <li>Meno: <b>${formData.contact.fName}</b></li>
             <li>Priezvisko: <b>${formData.contact.lName}</b></li>
             <li>Rodné číslo: <b>${formData.contact.bNumber}</b></li>
             <li>Tel. číslo: <b>${formData.contact.phoneNum}</b></li>
             <li>Číslo OP: <b>${formData.contact.id}</b></li>
             <li>Email: <b>${formData.contact.email}</b></li>
             <li>Pracovné zariadenie: <b>${formData.contact.job}</b></li>
         </ul>
    `;

    await transporter.sendMail({
        from: '"Best Pôžičky" <test@dpmg.dev>', // sender address
        to: `jan.nahalka348@gmail.com, `, // list of receivers
        subject: "Nová správa z webovej stránky", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    // const output = `
    //     <h3>Contact details</h3>
    //     <ul>
    //         <li>Name: <b>${formData.fName}</b></li>
    //         <li>Surname: <b>${formData.lName}</b></li>
    //         <li>Rodne cislo: <b>${formData.bNumber}</b></li>
    //         <li>Telefonne cislo: <b>${formData.phoneNum}</b></li>
    //         <li>Číslo občianského preukazu: <b>${formData.id}</b></li>
    //         <li>Email: <b>${formData.email}</b></li>
    //         <li>Tvoje pracovné zaradenie: <b>${formData.job}</b></li>
    //     </ul>
    // `;
    //
    // let transporter = nodemailer.createTransport({
    //     host: "mail.websupport.sk",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'test02@mail.dpmarketing.sk', // generated ethereal user
    //         pass: 'Yo9u#q%hv9', // generated ethereal password
    //     },
    // });
    //
    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: '"Test Person" <test02@mail.dpmarketing.sk>', // sender address
    //     to: `test02@mail.dpmarketing.sk, `, // list of receivers
    //     subject: "Personal info", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: output, // html body
    // });
    //
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    console.log(formData)

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

    // // send mail with defined transport object
    await transporter.sendMail({
        from: '"Best Pôžičky" <test@dpmg.dev>', // sender address
        to: `jan.nahalka348@gmail.com, `, // list of receivers
        subject: "Nová správa z webovej stránky", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });
    //
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    res.redirect('/form/dakujeme')
    // res.send('okay')
})

app.post('/calc', (req, res) => {
    formData.calcData = req.body

    res.redirect('/form/step-1')
})

app.get('/form/dakujeme', (req, res) => {
    res.render('form/form-dakujeme')
})
// Handling undefined routes
// app.all('*', (req, res, next) => {
//     next(new ExpressError("Page not found", 404))
// })

// Listening to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
