const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { user, store } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const { raw } = require("body-parser");

const app = express();
const router = express.Router();
app.use(express.json());

//유저 로그인 API
router.post("/login/common", async (req, res) => {
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
  res.send({
    token,
  });
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
  res.send({
    token,
  });
});

// router.post("/logout"){

// }

module.exports = router;