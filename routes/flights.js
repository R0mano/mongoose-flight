var express = require('express');
var router = express.Router();
const fligthsCtrl = require('../controllers/flights');

/* GET users listing. */
router.get('/', fligthsCtrl.index);
router.get('/new', fligthsCtrl.new);
router.post('/', fligthsCtrl.create);

module.exports = router;
