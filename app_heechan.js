const express = require('express');
const app = express();
const port = 8080

const router = express.Router();

const applyRouter = require('./routes/apply.router.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render("apply");
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });