const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');

const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/auth-middleware");
const { Server } = require("http");
const ejs = require('ejs');

const http = Server(app);

const indexRouter = require('./routes')
app.use(indexRouter)


User.sequelize.sync()
  .then(() => {
    console.log("DB Connection Success!")
  })
  .catch(console.error);


http.listen(8080, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });
  
