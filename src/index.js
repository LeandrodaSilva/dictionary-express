const express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
  origin: 'https://leandrodasilva.github.io'
}));
app.use(cors());
app.use(BodyParser.json())
app.use(cookieParser());
// app.use(files);
app.use(express.static('tmp'));
app.use(express.json());

require('./controllers/AppController')(app);
require('./controllers/AuthController')(app);
require('./controllers/UserController')(app);
require('./controllers/SearchController')(app);
require('./controllers/FileController')(app);

app.listen(process.env.PORT || 3333);
console.log('Express started on http://localhost:' + (process.env.PORT || 3333));
