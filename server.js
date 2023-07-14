const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

require('dotenv').config();
require('./config/db.connection');
require('./config/passport');

const infoController = require('./controllers/info-controller');
app.use('/info', infoController);

const userController = require('./routes/user');
app.use('/users', userController);

const chatController = require('./routes/chat');
app.use('/chat', chatController);

const { handleErrors } = require('./middleware/custom-errors');
app.use(handleErrors);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
