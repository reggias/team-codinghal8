const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/auth-middleware");
const { Server } = require("http");
const { User } = require('./models')
const ejs = require('ejs');
const loginrouter = require('./routes/login.routes')
const mysql = require("mysql2");
const app = express();
const http = Server(app);
const router = express.Router();

app.use(express.json());
app.use('/api', loginrouter);
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');

User.sequelize.sync()
  .then(() => {
    console.log("DB Connection Success!")
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.render('index');
})

http.listen(8080, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });
  
