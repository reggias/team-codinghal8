const express = require('express');
const app = express();
const port = 3000;

// const router = require('./routes');

/* router */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', router);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views')); // 정적파일 적용 css,js,image

/* views mapping */
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`SERVER ON! http://localhost:${port}/`);
});

module.exports = app;