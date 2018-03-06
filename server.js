const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    var now = new Date().toString();
    log = `${now}:${req.method} ${req.url}`;
    fs.appendFile('server.log', log+ '\n', (err)=>{
        if(err){
            console.log('Unable to append to server log');
        }
    });

    //res.render('mainteinance.hbs', {pageTitle:'Work in progress'});

    next();
});

app.use((req, res, next)=>{
    console.log('1');
    next();
});

app.use((req, res, next)=>{
    console.log('2');
    next();
});

app.use((req, res, next)=>{
    console.log('3');
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (request, response)=>{
    //response.send('<p style="color:red">hello express</p>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        name: 'Vittorio il magnifico'
    });
});

app.get('/about', (request, response)=>{
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response)=>{
    response.send({errorMessage: 'Unable to fulfill the request'});
});

app.listen(3000, ()=>{
    console.log('Server is running')
});