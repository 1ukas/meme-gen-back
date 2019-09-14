'using strict'
const express = require('express');
const router = express.Router();

router.post('/memeapi', (req, res) => {
    console.log(req.fields);
    res.send('Data received');
});

module.exports = router;