'use strict';

//Constructors//
const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('./pages/index')
});

app.post('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.author}`).then(data => {

    const books = data.body.items.map(book => ({name: book.volumeInfo.title}));

    console.log(books);

    res.render('book-results', {
      books: books
    });
  });


});




app.listen(3000, () => {console.log('Port 3000 is connected');});
