// const connect = require("./schemas");
// connect();

const express = require('express');
const app = express();

// Template
const ejs = require('ejs');

// multer
const multer = require('multer');
const form_data = multer();
// const multer = multer();
const path = require('path');
const fs = require('fs');

// Router
const reviewPostRouter = require('./routes/review.post.js');
const usersReviewGetRouter = require('./routes/review.store.js');

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(form_data.array());

// app.post("/", (req, res) => {
//   console.log(req.body)
//   res.send(`기본 URI에 POST 메서드가 정상적으로 실행되었습니다. ${req.body["key1234"]}`)
// })

app.get('/', (req, res) => {
    console.log('app_haksoo의 app.get("/")');
    res.status(200).send('review test를 위한 임시 서버');
});

app.use(express.json());
app.use('/api', [reviewPostRouter, usersReviewGetRouter]);
app.use(express.static('./views'));

// env setting
require('dotenv').config();

// ejs setting
app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log('Server don start for port: ' + PORT));
