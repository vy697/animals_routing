'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override');

var puppies = require('./routes/puppies');
var kittens = require('./routes/kittens');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use('/puppies', puppies);
app.use('/kittens', kittens);


app.listen(3000, function() {
  console.log("Listening on port 3000");
});
