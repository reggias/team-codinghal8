const express = require('express');
const app = express();

// multer
const multer = require("multer");
const form_data = multer();

const db = require("./models/index.js");
const port = 8080

const router = express.Router();
const ejs = require('ejs');

const applyRouter = require('./routes/apply.router.js');
const laundryRouter = require('./routes/laundry.router.js');

// view
app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./views'));
app.use(express.json());
app.use("/api", [ applyRouter, laundryRouter ]);

app.get('/', async(req, res) => {
  res.send('/api/apply 로 이동해주세요')
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });