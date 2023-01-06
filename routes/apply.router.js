const express = require("express");
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const path = require('path');
const upload = multer({

    storage: multer.diskStorage({
        // 파일 저장 경로: ./reviewImages
        destination: function (req, file, cb) {
            cb(null, 'applyImages/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
});

// 디렉토리 없을 경우 생성해주는 예외 처리
// (server listen 전 단계 이므로 동기식 코드로 해도 무방)
try {
    fs.readdirSync('applyImages');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('applyImages');
}

const { apply , sequelize } = require("../models");

router.post("/apply", upload.single('applyImage'), async (req,res) => {
    // try {
    
    const { user_id } = req.params;
    console.log(user_id)
    const { phone, address, category, memo } = req.body;

    if(!phone || !address || !category){
        return res.status(412).json({ errerMessage : "필수 정보를 입력해주세요" });
    }

    const reviewLaundryImage = req.files    // 파일 자체
    const reviewLaundryImagePath = req.file.path;   // 파일 경로

    // const user_id = 1;
    console.log(phone, address, reviewLaundryImagePath, category, memo)
    return res.json({msg: "세탁 신청에 성공하였습니다."});
        // res.status(200).json({ message: "세탁 신청에 성공하였습니다."});
    // } 
    // catch {
    //     res.status(400).json({ errerMessage : "세탁 신청에 실패하였습니다" });
    // }
});

// const authMiddleware = require('../middlewares/auth-middleware');

// 컨트롤러 가져오기
// const ApplyController = require('../controllers/applyController');
// 컨트롤러를 사용하기 위한 선언
// const applyController = new ApplyController();

// 서비스 신청내역 가져오기
// router.get('/laundry', authMiddleware, worksController.getWorks);

// 기존url+/laundry가 url로 들어 왔을 때  컨트롤러의 createWork로 이동
// router.post(
//   '/laundry',
//   authMiddleware,
//   upload.single('myimg'),
//   worksController.createWork
// );

// 잔여포인트, 손님 닉네임 조건 조회
// const { user } = require('./models');
// const { Op } = require('sequelize');

// const user = user.findAll({
//     attributes: ['point', 'nickname']
// });

// const result = User.create({ // 생성된 쿼리 결과를 얻는다.
//     phone: 
//     address: 
//     image: 
//     category: 
//     memo: 
// });

router.get('/apply', (req, res) => {
    res.render('apply', {
        my_rest_point: '100,000`',
        customer_nickname: '손님닉네임은 희찬님',
    });
});

module.exports = router;