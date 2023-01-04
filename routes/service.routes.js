const express = require('express');
const { QueryTypes } = require("sequelize");
const router = express.Router();

const ServiceController = require('../controllers/service.controller');
const serviceController = new ServiceController();

router.get('/laundry', serviceController.getService);
// router.post('/', serviceController.applyService);

/* 세탁 신청리스트 전체 조회 */
// router.get("/laundry", async (req, res, next) => {
//   try {
//     const query = `SELECT u.nickname, l.id, l.address, l.img, l.memo FROM laundries l LEFT JOIN users u ON l.user_id = u.id;`;
//     const serviceList = await sequelize.query(query,
//       {
//         type: QueryTypes.SELECT,
//       });
//     // console.log(serviceList);
//     if (serviceList.length === 0) {
//       return res
//         .status(404)
//         .json({ errorMessage: "게시글이 존재하지 않습니다." });
//     }
//     res.status(200).json({ serviceList });
//   } catch (err) {
//     // console.log(err);
//     res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
//   }
// });

module.exports = router;