const { user, reviews, laundry, store } = require('../models');
const { Op } = require('sequelize');

const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        // 파일 저장 경로: ./reviewImages
        destination: function (req, file, cb) {
            cb(null, 'reviewImages/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
});

try {
    fs.readdirSync('reviewImages');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('reviewImages');
}

// 게시글 생성 및 DB 등록 API -> URL: /UserId/review 로 수정필요
router.post(
    '/userId/laundryId/review', // '/:userId/:laundryId/review'
    upload.single('reviewLaundryImage'),
    async (req, res, next) => {
        const reviewUserId = req.params.userId;
        const reviewLaundryId = req.params.laundryId;
        const { rating, reviewStar, reviewLaundryCategory, reviewContent } =
            req.body; // text upload
        // const reviewLaundryImage = req.files; // image upload
        const reviewLaundryImagePath = req.file.path;
        console.log(reviewLaundryImagePath);
        console.log(rating, reviewStar, reviewLaundryCategory, reviewContent);
        console.log('reviewLaundryImage :', reviewLaundryImage);

        await reviews.create({   
            star: reviewStar,
            category: reviewLaundryCategory,
            content: reviewContent,
            imgPath: reviewLaundryImagePath,
            user_id: reviewUserId,
            laundry_id: reviewLaundryId,
        });

        res.status(201).json({ msg: 'success!' });
    }
);

// rendering - reviewPostForm
router.get(
    '/userId/laundryId/review', // '/:userId/:laundryId/review'
    async (req, res) => {
        const user_id = req.params.userId;
        const laundry_id = req.params.laundryId;
        const customer_nickname = await user.findAll({
            attributes: ['nickname'],
            where: {
                user_id,
            },
        });
        const store_id = await laundry.findAll({
            attributes: ['store_id'],
            where: {
                laundry_id,
            },
        });
        const store_nickname = await store.findAll({
            attributes: ['store_nickname'],
            where: {
                store_id,
            },
        });

        res.render('review-post', {
            customer_nickname: '더러운빨래가너무많아요', // DB 적용
            store_nickname: '새하얗게빨아주는세탁소', // DB 적용
        });
    }
);

module.exports = router;
