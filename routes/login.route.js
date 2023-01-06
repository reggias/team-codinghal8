const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { user, store } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const { raw } = require("body-parser");
const session = require('express-session');

var cookieParser = require('cookie-parser')

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cookieParser())

//유저 로그인 API
router.post("/login/common", async (req, res) => {
  try {
      const { id, password } = req.body;
      const user_id = req.body["id"];

      const User = await user.findOne({
        where: { user_id, password },
        raw: true,
      });

      if (!User) {
        res.status(400).send({
          errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
        });
        return;
      }
      
      const token = jwt.sign({ user_id: User.user_id }, "customized-secret-key");

      app.use(session({
        key: 'token',
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 24000 * 60 * 60 
        }
      }));

      res.send({
        token,
      });

    }
  catch(err){
      res.status(400).json({
      errorMessage: '로그인에 실패하였습니다.',
      });
    }
});

//사업자 로그인 API
router.post("/login/business", async (req, res) => {
  const { id, password } = req.body;
  const store_id = req.body["id"];

  const Store = await store.findOne({ 
    where: { store_id, password },
    raw: true,
  });
  if (!Store) {
    res.status(400).send({
      errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
    });
    return;
  }
  
  const token = jwt.sign({ store_id: Store.store_id }, "customized-secret-key");
  res.cookie('token', token );
  console.log('token:',token)
  console.log('req.cookies:',req.cookies)

  res.send({
    token,
  });
});


module.exports = router;