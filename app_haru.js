const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/auth-middleware");
const { Server } = require("http");
const { User } = require('./models')
const ejs = require('ejs');

const app = express();
const http = Server(app);
const router = express.Router();

// app.use(express.static("assets"));
app.use(express.json());
app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  res.render('index');
})

router.post("/users", async (req,res) => {
  const {email, nickname, password, confirmPassword} = req.body;

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findAll({
    where: {
      [Op.or]: [{ email }, { nickname }],
    },
  });
  if (existsUsers.length) {
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  await User.create({ email, nickname, password });
  res.status(201).send({});
});


http.listen(8080, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });
  