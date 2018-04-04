const express = require('express');
const router = express.Router();

// default
router.get('/', (req, res) => {
    res.json({ message: `Hello World, it's ${new Date()}` });
});

module.exports = router;
