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
        // // image 종류의 파일만 허용
        // fileFilter(req, file, done) {
        //     if (file.mimetype.lastIndexOf('image') > -1) {
        //         done(null, true);
        //     } else {
        //         //파일 거부
        //         done(null, false);
        //     }
        // },
    }),
    // 파일 허용 사이즈 (5 MB)
    // limits: { fileSize: 5 * 1024 * 1024 },
});

// 게시글 생성 및 DB 등록 API -> URL: /laundryId/review 로 수정필요
router.post(
    '/review',
    upload.single('reviewLaundryImage'),
    async (req, res, next) => {
        // 디렉토리 없을 경우 생성해주는 예외 처리
        // (server listen 전 단계 이므로 동기식 코드로 해도 무방)
        try {
            fs.readdirSync('reviewImages');
        } catch (error) {
            console.error('not exist directory.');
            fs.mkdirSync('reviewImages');
        }
        const reviewFormData = req.body; // text upload
        const reviewLaundryImage = req.files; // image upload
        const reviewLaundryImagePath = req.file.path;
        console.log(reviewLaundryImagePath);
        console.log(reviewFormData);
        console.log('reviewLaundryImage :', reviewLaundryImage);
        // DB에는 경로만 저장
        // const formData = req.body; console.log(req.body); console.log(formData);
        res.status(201).json({ msg: 'success!' });
    }
);

router.get('/review', (req, res) => {
    res.render('review-post', {
        customer_nickname: '원빈보단장빈',
        store_nickname: '현빈정도는 뺨 10대 치는 장빈 세탁소',
    });
});

module.exports = router;
