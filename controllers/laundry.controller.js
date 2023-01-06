const express = require("express");
const router = express.Router();

const ejs = require('ejs'); // 필요
const LaundryService = require('../services/laundry.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class LaundryController {
  laundryService = new LaundryService(); // Post 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getLaundry = async (req, res, next) => {
    try {
      const laundry = await this.laundryService.findAllLaundry();

      
      res.status(200).render("laundry", {
        laundry_category: 2,
        laundry_state: 5,
        store_nickname: '집게사장'
      }) // json 이 있으면 렌더링이 안됨
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "세탁 신청 리스트 조회에 실패하였습니다." });
    }
  }  
};

module.exports = LaundryController;