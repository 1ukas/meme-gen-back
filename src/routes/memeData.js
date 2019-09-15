'using strict'
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const stream = require('stream');
const path = require('path');

const router = express.Router();
const generateImage = require('../modules/generateImage');

router.post('/memeapi', (req, res) => {
    //console.log(req.fields);
    //res.send('Data received');
    // remove meta-data from base64 string:
    const imageBaseData = req.fields.file.split(',')[1];
    const data = {
        imageData: imageBaseData,
        topText: req.fields.topText,
        bottomText: req.fields.bottomText
    }
    generateImage.generateImage(data, (callback) => {
        let data = new FormData();
        data.append('file', callback);
        res.set('content-type', `multipart/form-data; boundary=${data._boundary}`);
        res.send(data);
    });
});

module.exports = router;