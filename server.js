const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageHead: 'Maintenance under way!',
//     currentYear: new Date().getFullYear()
//   });
// });

app.get('/', (req, res) => {
  res.render('welcome.hbs', {
    pageHead: 'Welcome to Springfield',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageHead: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageHead: 'Portfolio Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Bad REquest"
  });
});

app.listen(port);
