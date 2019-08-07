const {Router} = require('express');
const router = Router();
const path = require('path');
let users = [];
global.userInfo = [];
router.get('/', (req, res) => {
	res.write('Hello world!\n');
	res.write(req.time);
	res.end();
})
router.get('/myroute/:param', (req, res) => {
	res.header("Content-Type",'application/json');
	res.send(JSON.stringify({ params: req.params, query: req.query, headers: req.headers, cookies: req.cookies }, null, 4));
})
router.get('/form', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})
router.post('/form', (req, res) => {
	global.userInfo.push({
		username: req.body.username,
		password: req.body.password,
		agree: Boolean(req.body.agree),
		gender: req.body.gender,
	});
	res.redirect('/result')
})
router.get('/result', (req, res) => {
	res.header("Content-Type",'application/json');
	res.send(JSON.stringify(global.userInfo));
})
router.get('/api/time', (req, res) => {
	res.send({time: new Date().getHours() + ":" + new Date().getMinutes()})
})
router.post('/api/users', (req, res) => {
	users.push(req.body);
	res.end();
})
router.get('/api/users', (req, res) => {
	res.send(users)
})
module.exports = router;