
//// use app.use and it will stop all other things in your project  and will return the specified view..
///  but it will only stop the things which are under it..  it cant stop the things which are over or above, already used or run by the project.
/// in this ex this cant stop the help.html becz it was declared as an static before the app.use was called
const express = require('express');
var app = express();
const hbs = require('hbs');  //  making the hbs request ,  but first install the "hbs" from  npm
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');  // will auto relocate the request to the specified path

app.set('view engine', 'hbs');   // setting the hbs as the view engine

app.use(express.static(__dirname + '/public'));  // making something Static in the project like html and css


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});
// this method will make a global access to the parameter "getCurrentYear" , can be used in diff file by {{getCurrentYear}}
// will return the date with year


app.use((req, res, next) => {
    var now = new Date().toString();
var log = `${now}; ${req.method} ${req.url}`;// for getting the currrent time and the date, and also the url and request page

console.log(log);
fs.appendFile('server.log', log + '\n')  // it will create a log file and  maintain the log record


next();

});
//////////////////////////////////  IMP ////////////////////////////////
//
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
//////////////////////////  IMPORTANT  //////////////  this code will restrict all the other function or other things to req res to each other..
////////////////////////////////////////////////////   this will restrict{stop} other features and facilities and will only display the message written in maintenance.hbs file...

// hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase()
// });
//  this method will return the text in the upper case ...  to use this method use <p>{{screamIt welcomeMessage}}


app.get('/', (req, res) => {
    //res.send('<h1>hello express</h1>');
    res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({
    name: 'ashish',
    likes: [
        'Biking', 'flying kites'
    ]
}))
});

app.listen(port, () => {
    console.log('we are live on server ' + port)
});


app.get('/home', (req, res) => {
    res.render('home.hbs', {
    WebSite_Name: 'Ankit Road Club',
    Owner_Name: 'Ankit Singh',

})
})
// will call when the home page is called and will return the following parameters..

app.get('/about', (req, res) => {
    res.render('about.hbs', {
    WebSite_Name: 'Ankit Road Club',
    pageTitle: 'About Page',
});
// res.send('about page');
})

app.get('/bad', (req, res) => {
    res.send({
    name: 'ashuyish',
    likes: [
        'Biking', 'flying kites'
    ]
})
});

