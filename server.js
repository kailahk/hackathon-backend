const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
// app.use(
// 	cors({
// 		origin: [
// 			'http:localhost:8000',
// 			'http://ally-fj80.onrender.com',
// 			'https://ally-fj80.onrender.com',
// 		],
// 		credentials: true,
// 	})
// );
// app.use('*', cors());
// app.use(function (req, res, next) {
// 	const allowedOrigins = [
// 		'http://localhost:3000',
// 		'http://ally-fj80.onrender.com',
//  	'https://ally-fj80.onrender.com',
// 	];
// 	const origin = req.headers.origin;
// 	if (allowedOrigins.includes(origin)) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
// 	next();
// });
app.use(
	cors({
		origin: [
			'http:localhost:3000',
			'http://ally-5t5u.onrender.com/',
			'https://ally-5t5u.onrender.com/',
		],
		credentials: true,
	})
);

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
