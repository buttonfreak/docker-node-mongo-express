
const express = require('express');

const router = express.Router();

// Require controller modules.
const bearController = require('../controllers/bearController');

router.get('/', bearController.getList);
router.get('/:bear_id', bearController.get);
router.post('/create', bearController.post);
router.put('/:bear_id', bearController.put);
router.delete('/:bear_id', bearController.delete);

module.exports = router;
