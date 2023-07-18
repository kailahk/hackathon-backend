const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
app.use(cors());

const infoController = require('./controllers/info-controller');
const userController = require('./routes/user');
const chatController = require('./routes/chat');
const { handleErrors } = require('./middleware/custom-errors');
require('dotenv').config();
require('./config/db.connection');
require('./config/passport');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));
app.use('/info', infoController);
app.use('/users', userController);
app.use('/chat', chatController);
app.use(handleErrors);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
