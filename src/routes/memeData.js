'using strict'
const express = require('express');
const FormData = require('form-data');

const router = express.Router();
const generateImage = require('../modules/generateImage');

router.post('/memeapi', (req, res) => {
    //console.log(req.fields);
    // remove meta-data from base64 string:
    const imageBaseData = req.fields.file.split(',')[1];
    // get the data from the request:
    const data = {
        imageData: imageBaseData,
        topText: req.fields.topText,
        bottomText: req.fields.bottomText
    }

    // generate the image and send it back as a response:
    generateImage.generateImage(data, (callback) => {
        // handle any errors that came up during image processing:
        if (!callback) {
            res.sendStatus(500);
            return;
        }

        // prepare the response data and send it back to the client:
        let data = new FormData();
        data.append('file', callback);
        res.set('content-type', `multipart/form-data; boundary=${data._boundary}`);
        res.send(data);
    });
});

module.exports = router;