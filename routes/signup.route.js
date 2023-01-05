const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();

const { user, store } = require("../models");

router.post("/signup/common", async (req,res) => {
  const { user_id, nickname, password, confirmPassword } = req.body;
  
  // console.log(user_id, username, password, confirmPassword);

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "동일한 비밀번호로 입력해주세요",
    });
    return;
  }
  const existUsers = await user.findAll({
    where: {
      [Op.or]: [{user_id}, { nickname }],
    },
  });
  if (existUsers.length) {
    res.status(400).send({
      errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
    });approuter
    return;
  }
  await user.create({user_id, nickname, password});

  res.status(200).send({ message: "유저 회원가입에 성공하였습니다." });
});


router.post("/signup/business", async (req,res) => {
  const { store_id, nickname, password, confirmPassword } = req.body;
  
  // console.log(user_id, username, password, confirmPassword);

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "동일한 비밀번호로 입력해주세요",
    });
    return;
  }
  const existStores = await store.findAll({
    where: {
      [Op.or]: [{store_id}, { nickname }],
    },
  });
  if (existStores.length) {
    res.status(400).send({
      errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
    });
    return;
  }
  await store.create({store_id, nickname, password});

  res.status(200).send({ message: "사업자 회원가입에 성공하였습니다." });
});

module.exports = router;