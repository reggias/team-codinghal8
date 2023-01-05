const express = require('express');
const app = express();
const port = 3000;

// const router = require('./routes');

/* router */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views')); // 정적파일 적용 css,js,image

app.get('/', (req, res) => {
  res.render('index.ejs');
});

/* routes */
app.use("/api", require("./routes/signup.route.js"));
app.use("/api", require("./routes/login.route"));


app.listen(port, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});