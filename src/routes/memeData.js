'using strict'
const express = require('express');
const router = express.Router();
const generateImage = require('../modules/generateImage');

router.post('/memeapi', (req, res) => {
    //console.log(req.fields);
    res.send('Data received');
    // remove meta-data from base64 string:
    const imageBaseData = req.fields.file.split(',')[1];
    const data = {
        imageData: imageBaseData,
        topText: req.fields.topText,
        bottomText: req.fields.bottomText
    }
    generateImage.generateImage(data, (callback) => {
        
    });
});

module.exports = router;