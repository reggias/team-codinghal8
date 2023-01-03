const express = require('express');
const router = express.Router();

// 게시글 생성 및 DB 등록 API
// const Posts = require("../schemas/post.js")
router.post('/review', async (req, res) => {
    const { receive_test } = req.body;
    console.log(receive_test);
    // const [ dbData ] = await Posts.find({ postsId });
    // if (dbData) {
    // return res
    //     .status(202)
    //     .json({
    //         success: false,
    //         errorMessage: "이미 존재하는 데이터입니다."
    //     });
    // }

    //   const createdPosts = await Posts.create({ postsId, title, author, password, dateCreated, content });
    res.status(200).json({ msg: 'success' });
});

module.exports = router;
