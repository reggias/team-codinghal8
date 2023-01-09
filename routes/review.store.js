const { user, reviews, laundry, store } = require('../models');
const { Op } = require('sequelize');

const express = require('express');
const router = express.Router();

router.get('/storeId/reviewId', async (req, res) => {
    // const store_id = req.params.storeId;
    // const review_id = req.params.reviewId;

    // const [store_nickname] = await user;
    // await user.findAll({
    //     attributes: ['star', 'content', 'createdAt', 'imgPath'],
    //     where: {
    //         review_id,
    //     },
    // });
    // const [review_star, review_content, review_createdAt, review_Image] =
    //     await user.findAll({
    //         attributes: ['star', 'content', 'createdAt', 'imgPath'],
    //         where: {
    //             review_id,
    //         },
    //     });
    res.render('store-review-get', {
        store_nickname: '현빈정도는 뺨 10대 치는 장빈 세탁소',
        review_userNickname: '손님닉네임은 수염민희찬님은미남',
        review_createdAt: '2022-12-27 14:00', // DB 유
        review_category: '카테고리는 상의로 해볼까여',
        review_star: 4, // DB 유
        review_content:
            '아주 깨끗하고 좋아요! 완전 새하얗게 되었는데 정말 감사합니다. 다음에는 누렇게 된 와이셔츠랑 흰 옷들을 모두 맡겨야겠어요! 흰 신발까지도요 ㅎㅎ.', // DB 유
        review_image: 'PATH', // DB 유
    });
});

module.exports = router;
