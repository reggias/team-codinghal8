// const connect = require("./schemas");
// connect();

const express = require('express');
const app = express();
const port = 3000;
const reviewPostRouter = require('./routes/review.post.js');

// app.post("/", (req, res) => {
//   console.log(req.body)
//   res.send(`기본 URI에 POST 메서드가 정상적으로 실행되었습니다. ${req.body["key1234"]}`)
// })

app.get('/', (req, res) => {
    console.log('app_haksoo의 app.get("/")');
    res.status(200).send('review test를 위한 임시 서버');
});

app.use(express.json());
app.use('/api', reviewPostRouter);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
