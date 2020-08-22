const express = require('express');
const router = express.Router();
const fligthsCtrl = require('../controllers/flights');

/* GET users listing. */
router.get('/', fligthsCtrl.index);
router.get('/new', fligthsCtrl.new);
router.get('/:id', fligthsCtrl.show)
router.post('/', fligthsCtrl.create);

module.exports = router;
