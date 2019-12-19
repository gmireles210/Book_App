'use strict';

//Constructors//
const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const ejs = require('ejs');

app.use(express.urlencoded({extended: true}));




app.get('/', (req, res) => {
  let query = 'Star Wars';
  if (req.query.public) {
    query = req.query.public;
  }
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${ query }`)
    .then(bookResponse => {
      //console.log(bookResponse);
      res.render('./pages/index.ejs', {books: bookResponse.body.items});
    });


});


app.listen(3000, () => {console.log('Port 3000 is connected');});