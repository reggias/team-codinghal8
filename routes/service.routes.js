const express = require('express');
const { QueryTypes } = require("sequelize");
const router = express.Router();

const { laundry, sequelize,  } = require("../models");

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

/* 세탁 신청 리스트에서 사장이 [세탁 진행] 버튼 눌렀을 때 */
router.put("/laundry/:id", async (req, res) =>{
  try {
    const { id } = req.params;
    // 세탁 신청한 laundry 테이블의 id 값을 찾는다
    const serviceApplyList = await laundry.findOne({
      where: { id },
      raw: true,
    });
    // 먼저 누른 사장님이 있을때
    if (serviceApplyList["store_id"] !== null) {
      return res
        .status(412)
        .json({ message: "이미 다른 사장님이 진행중입니다." });
    };
    // 세탁 신청이 존재하지 않을때
    if (serviceApplyList == null) {
      return res
        .status(404)
        .json({ message: "세탁 신청이 존재하지 않습니다." });
    }
    const state = "수거중";
    const store_id = 1;

    await laundry.update({ state, store_id }, { where: { id } });
    res.status(200).json({ message: "해당 세탁물을 수거해주세요!" });
  } catch {
    res.status(400).json({ message: "관리자에게 문의하세요." });
  }
});

/* 세탁 진행 리스트에서 [상태 변경] 버튼 눌렀을 때 */
router.put("/state/:store_id/:id", async (req, res) =>{
  const { store_id, id } = req.params;

  const stateUpdate = await laundry.findOne({
    where: { store_id, id },
    raw: true,
  });

  const putState = stateUpdate[ "state" ];
  const teststoreid = "1";

  if ( store_id !== teststoreid ) {
    return res
      .status(412)
      .json({ message: "123" });
  }

  if ( putState == "수거중" ) {
    await laundry.update({ state:"수거완료" }, { where: { store_id, id } });
    res.status(200).json({ message: "상태변경 완료" });
  } else if ( putState == "수거완료" ) {
    await laundry.update({ state:"배송중" }, { where: { store_id, id } });
    res.status(200).json({ message: "상태변경 완료" });
  } else if ( putState == "배송중" ) {
    await laundry.update({ state:"배송완료" }, { where: { store_id, id } });
    res.status(200).json({ message: "상태변경 완료" });
  }
});
module.exports = router;