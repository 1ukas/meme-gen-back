'use strict'
const jimp = require('jimp');

let imageWidth = 0;
let imageHeight = 0;
module.exports.generateImage = (data, callback) => {
    try {
        if (data.length == 0) throw new Error('data is empty');

        const buff = Buffer.from(data.imageData, 'base64');
        jimp.read(buff)
        .then(image => setImageFontSize(image)
        .then(font => {
            //image.rgba(false);
            const placementX = 0;
            const topPlacementY = imageHeight*0.02; // 2% top margin
            const bottomPlacementY = imageHeight - (imageHeight*0.02); // 2% bottom margin
            const marginedWidth = imageWidth - (imageWidth*0.02); // 2% side margin
            let lines = [];

            // separate the top text so it wraps in the image:
            lines = getTextWrap(data.topText, font, marginedWidth);
            console.log(lines);

            image.print(font, placementX, topPlacementY, 
            {
                text: data.topText,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, marginedWidth, imageHeight);

            // separate the bottom text so it wraps in the image:
            lines = getTextWrap(data.bottomText, font, marginedWidth);
            console.log(lines);

            // get the bottom text height margin:
            let lineHeight = 0;
            lines.forEach(element => {
                lineHeight += jimp.measureTextHeight(font, element, imageWidth);
            });

            return image.print(font, placementX, bottomPlacementY - lineHeight, 
            {
                text: data.bottomText,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, marginedWidth, imageHeight)
        })
        //.then(image => (image.quality(100).write('imgExported.jpeg')))
        .then(image=> image.quality(100).getBase64(jimp.AUTO, (err, res) => {
            callback(res);
        })));
    }
    catch (error) {
        console.error(error);
        callback(0);
    }
}

const setImageFontSize = (image) => {
    imageWidth = image.bitmap.width;
    imageHeight = image.bitmap.height;
    console.log(imageWidth);
    if (imageWidth <= 200) {
        return jimp.loadFont('./fonts/open_sans_white_bold_outlined_16.fnt');
    }
    else if (imageWidth <= 500) {
        return jimp.loadFont('./fonts/open_sans_white_bold_outlined_32.fnt');
    }
    else if (imageWidth >= 800) {
        return jimp.loadFont('./fonts/open_sans_white_bold_outlined_64.fnt');
    }
    else if (imageWidth > 1400) {
        return jimp.loadFont('./fonts/open_sans_white_bold_outlined_128.fnt');
    }
}

const getTextWrap = (text, font, imageWidth) => {
    let lines = [];
    let width = 0;
    while ( text.length ) {
        let i = 0;
        for( i=text.length; jimp.measureText(font, text.substr(0,i)) > imageWidth; i-- );
    
        let result = text.substr(0,i);
    
        let j = 0;
        if ( i !== text.length )
            for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );

        lines.push( result.substr(0, j|| result.length) );
        width = Math.max( width, jimp.measureText(font, lines[ lines.length-1 ]));
        text  = text.substr( lines[ lines.length-1 ].length, text.length );
    }
    return lines;
}