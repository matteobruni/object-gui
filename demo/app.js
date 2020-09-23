const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');

const app = express();

// app.use(helmet()); // Safari requires https, probably a bug

const port = 3030;

app.set('views', './demo/views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./demo/public'));
app.use(express.static('./demo/public'));
app.use("/object-gui", express.static("./dist"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
