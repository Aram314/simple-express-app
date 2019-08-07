const express = require('express');
const routes = require('./route');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3005;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', (req, res, next) => {
	if(!req.cookies.time) {
		res.setHeader('set-cookie', `time=${new Date()}`)
	}
	req.time = req.cookies.time;
	next();
})

app.use(routes);
app.listen(PORT, () => {
	console.log('Server has been started...')
})

