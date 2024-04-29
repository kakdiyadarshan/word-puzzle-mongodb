var express = require('express');
var router = express.Router();
const user = require('../controllers/userController')

/* GET users listing. */

router.post('/register',user.insertuser);
router.post('/',user.login);
router.get('/view_puzzle/:id',user.viewpuzzle);
router.get('/play_puzzle/:id',user.startgame);
router.post('/play_puzzle/:id',user.checkans);
router.get('/skip_puzzle/:id',user.skippuz);

module.exports = router;
