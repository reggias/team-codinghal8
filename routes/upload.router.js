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