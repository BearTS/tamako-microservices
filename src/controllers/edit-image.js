require('dotenv').config();
const { join } = require('path');
const { wordTrans } = require('custom-translate');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('node-superfetch');
const isImageUrl = require('is-image-url');
const stackBlur = require('stackblur-canvas');
const moment = require('moment');
const gm = require('gm').subClass({ imageMagick: true });

const minecraftachivement = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'achievement.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '17px Minecraftia';
    ctx.fillStyle = '#ffff00';
    ctx.fillText('Achievement Get!', 60, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(shortenText(ctx, text, 230), 60, 60);
    return canvas.toBuffer();
};

const approve = async (url) => {
    if (!isImageUrl(url)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'approved.png'));
    const { body } = await request.get(url);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

const axiscult = async (username, gender, age, profession) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'axis-cult-sign-up.jpg'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '96px Konosuba';
    ctx.fillText(username, 960, 1558);
    ctx.fillText(gender, 960, 1752);
    ctx.fillText(age, 1700, 1752);
    ctx.fillText('XXX-XXX-XXXX', 960, 1960);
    ctx.fillText(profession, 960, 2169);
    ctx.fillText('Tamako', 960, 2370);
    ctx.font = '123px Konosuba';
    ctx.fillText('ERIS PADS\nHER CHEST!', 1037, 2874);
    return canvas.toBuffer();
}; 

const blur = async (radius, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    stackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, radius);
    return canvas.toBuffer();
};

const bobross = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'bob-ross.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    const { x, y, width, height } = centerImagePart(data, 440, 440, 15, 20);
    ctx.drawImage(data, x, y, width, height);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const brazzers = async (image) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'brazzers.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const ratio = base.width / base.height;
    const width = data.width / 3;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, 0, data.height - height, width, height);
    return canvas.toBuffer();
};

const caution = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'caution.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '60px Noto Bold';
    let fontSize = 60;
    while (ctx.measureText(text).width > 3311) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Bold`;
    }
    const lines = await wrapText(ctx, text.toUpperCase(), 895);
    const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    return canvas.toBuffer();
};

const certificate = async (reason, name) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'certificate.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '30px oldengl';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(reason, 518, 273);
    ctx.fillText(name, 518, 419);
    ctx.fillText(moment().format('MM/DD/YYYY'), 309, 503);
    return canvas.toBuffer();
};

const charcoal = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.charcoal(1);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const chineserestaurant = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'chinese-restaurant.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = '#1f1f1f';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 28px Futura Condensed';
    const lines = await wrapText(ctx, text.toUpperCase(), 340);
    if (lines.length === 1) {
        ctx.fillText(lines[0], base.width / 2, 288);
    } else if (lines.length === 2) {
        ctx.fillText(lines[0], base.width / 2, 288);
        ctx.fillText(lines[1], base.width / 2, 315);
    } else if (lines.length === 3) {
        ctx.fillText(lines[0], base.width / 2, 261);
        ctx.fillText(lines[1], base.width / 2, 288);
        ctx.fillText(lines[2], base.width / 2, 315);
    } else {
        ctx.fillText(lines[0], base.width / 2, 261);
        ctx.fillText(lines[1], base.width / 2, 288);
        ctx.fillText(lines[2], base.width / 2, 315);
        ctx.fillText(lines[3], base.width / 2, 342);
    }
    return canvas.toBuffer();
}; 

const circle = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const dimensions = data.width <= data.height ? data.width : data.height;
    const canvas = createCanvas(dimensions, dimensions);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(data, (canvas.width / 2) - (data.width / 2), (canvas.height / 2) - (data.height / 2));
    return canvas.toBuffer();
};

const color = async(color) => {
    color = color.toLowerCase();
    const canvas = createCanvas(250, 250);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 250, 250);
    return canvas.toBuffer();
};

const communist = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'chinese-restaurant.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, 'red', 0, 0, data.width, data.height);
    const { x, y, width, height } = centerImage(base, data);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(base, x + (width / 20), y + (height / 20), width * 0.9, height * 0.9);
    ctx.globalAlpha = 1;
    return canvas.toBuffer();
};

const contrast = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fcontrast(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const createQr = async (text) => {
    try {
        const { body } = await request
            .get('https://api.qrserver.com/v1/create-qr-code/')
            .query({ data: text });
    
        return body;
    }
    catch (err) {
        return 0;
    }
};

const customtext = async (url, text) => {
    if (!isImageUrl(url)) return 0;
    const { body } = await request.get(url);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const imgW = canvas.width;
    const imgH = canvas.height;
    const originX = imgW / 2;
    const originY = imgH / 2;
    const textAngleDeg = -15;
    const boxPadding = 1;
    const maxMultiplier = 0.8;
    const textAngle = (textAngleDeg * Math.PI) / 180;
    ctx.font = '10px Impact';
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    const {
        width,
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
        actualBoundingBoxRight,
        actualBoundingBoxLeft,
    } = ctx.measureText(text);
    const widthOffset = (actualBoundingBoxRight - actualBoundingBoxLeft)/2;
    const heightOffest = (actualBoundingBoxAscent - actualBoundingBoxDescent)/2;
    const textHeight = 
      actualBoundingBoxAscent +
      actualBoundingBoxDescent +
      boxPadding * 2 +
      ctx.lineWidth * 2;
    const textWidth =
      width +
      boxPadding * 2 +
      ctx.lineWidth * 2;
    const textWidthR =
      textHeight * Math.abs(Math.sin(textAngle)) +
      textWidth * Math.abs(Math.cos(textAngle));
    const textHeightR =
      textHeight * Math.abs(Math.cos(textAngle)) +
      textWidth * Math.abs(Math.sin(textAngle));
    const scale = Math.min(imgW / textWidthR, imgH / textHeightR);
    createTransform(ctx, originX, originY, textAngle, scale * maxMultiplier);
    roundRect(
        ctx,
        originX - textWidth / 2,
        originY - textHeight / 2,
        textWidth,
        textHeight,
        1,
        false
    );
    ctx.fillText(text, originX - widthOffset, originY + heightOffest);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return canvas.toBuffer();
};

const danger = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'danger.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '60px Noto Bold';
    let fontSize = 60;
    while (ctx.measureText(text).width > 2520) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Bold`;
    }
    const lines = await wrapText(ctx, text.toUpperCase(), 840);
    const topMost = 510 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    return canvas.toBuffer();
};

const dannydevito = async (image) => {
    if (!isImageUrl(image)) return 0;
    const danny = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'danny-devito.png'));
    const imgData = await request.get(image);
    try {
        const faces = await detect(imgData);
        if (!faces) return 400;
        if (faces === 'size') return 2;
        const base = await loadImage(imgData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        for (const face of faces) {
            const landmarks = face.landmark;
            const width = landmarks.contour_right1.x - landmarks.contour_left1.x;
            const ratio = width / danny.width;
            const height = danny.height * ratio;
            ctx.drawImage(
                danny,
                landmarks.contour_left1.x - (width * 0.25),
                landmarks.contour_left1.y - (height / 2) - (height * 0.25),
                width * 1.5,
                height * 1.5
            );
        }
        return canvas.toBuffer();
    } catch (err) {
        if (err.status === 400)  return 400;
        if (err.status === 403) return 403;
        return 500;
    }

};

const desaturate = async (level, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fdesaturate(ctx, level, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const dexter = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'dexter.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-11 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 225, 225, 234, 274);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(11 * (Math.PI / 180));
    return canvas.toBuffer();
};

const distort = async (level, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fdistort(ctx, level, 0, 0, data.width, data.height);
    return canvas.toBuffer();

};

const emboss = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.emboss();
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const eyes = async (image) => {
    if (!isImageUrl(image)) return 0;
    const eyes = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'eyes.png'));
    const imgData = await request.get(image);
    try {
        const faces = await detect(imgData);
        if (!faces) return 400;
        if (faces === 'size') return 2;
        const base = await loadImage(imgData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        for (const face of faces) {
            const landmarks = face.landmark;
            const leftWidth = landmarks.left_eye_right_corner.x - landmarks.left_eye_left_corner.x;
            const leftRatio = leftWidth / eyes.width;
            const leftHeight = eyes.height * leftRatio;
            ctx.drawImage(
                eyes,
                landmarks.left_eye_left_corner.x - (leftWidth / 2),
                landmarks.left_eye_left_corner.y - (leftHeight / 2) - (leftHeight / 2),
                leftWidth * 2,
                leftHeight * 2
            );
            const rightWidth = landmarks.right_eye_right_corner.x - landmarks.right_eye_left_corner.x;
            const rightRatio = rightWidth / eyes.width;
            const rightHeight = eyes.height * rightRatio;
            ctx.drawImage(
                eyes,
                landmarks.right_eye_left_corner.x - (rightWidth / 2),
                landmarks.right_eye_left_corner.y - (rightHeight / 2) - (rightHeight / 2),
                rightWidth * 2,
                rightHeight * 2
            );
        }
        return canvas.toBuffer();
    } catch (err) {
        if (err.status === 400)  return 400;
        if (err.status === 403) return 403;
        return 500;
    }
};

const fireframe = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'fire-frame.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, '#fc671e', 0, 0, data.width, data.height);
    ctx.drawImage(base, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const fishEye = async (level, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    ffishEye(ctx, level, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const gandhiquote = async (quote) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'gandhi-quote.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px lmroman10 italic';
    ctx.fillStyle = 'white';
    let fontSize = 50;
    while (ctx.measureText(quote).width > 945) {
        fontSize--;
        ctx.font = `${fontSize}px lmroman10 italic`;
    }
    const lines = await wrapText(ctx, quote, 270);
    const topMost = 180 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], 395, height);
    }
    return canvas.toBuffer();
};

const ghost = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, data.width, data.height);
    ctx.globalAlpha = 0.25;
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
};

const glassshatter = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'glass-shatter.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    ctx.drawImage(base, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const glitch = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fdistort(ctx, 20, 0, 0, data.width, data.height, 5);
    return canvas.toBuffer();
};

const greyscale = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fgreyscale(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const gun = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'gun.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const ratio = (data.height / 2) / base.height;
    const width = base.width * ratio;
    ctx.drawImage(base, data.width - width, data.height - (data.height / 2), width, data.height / 2);
    return canvas.toBuffer();
};

const hands = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'hands.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const ratio = data.width / base.width;
    const height = base.height * ratio;
    ctx.drawImage(base, 0, data.height - height, data.width, height);
    return canvas.toBuffer();
};

const highwaysign = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'highway-sign.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = '#efe390';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '18px EHSMB';
    const lines = await wrapText(ctx, text.toUpperCase(), 178);
    if (lines.length === 1 ) {
        ctx.fillText(lines[0], 318, 109);
    } else if (lines.length === 2) {
        ctx.fillText(lines[0], 318, 109);
        ctx.fillText(lines[1], 318, 128);
    } else if (lines.length === 3) {
        ctx.fillText(lines[0], 318, 90);
        ctx.fillText(lines[1], 318, 109);
        ctx.fillText(lines[2], 318, 128);
    } else {
        ctx.fillText(lines[0], 318, 90);
        ctx.fillText(lines[1], 318, 109);
        ctx.fillText(lines[2], 318, 128);
        ctx.fillText(lines[3], 318, 147);
    }
    return canvas.toBuffer();
};

const hollywoodstar = async (name) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'hollywood-star.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '28px HollywoodStar';
    ctx.fillStyle = '#fadfd4';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(name.toLowerCase(), 288, 140);
    return canvas.toBuffer();
};

const ifunny = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'ifunny.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    ctx.fillStyle = '#181619';
    ctx.fillRect(0, canvas.height - base.height, canvas.width, base.height);
    ctx.drawImage(base, canvas.width - base.width, canvas.height - base.height);
    return canvas.toBuffer();
};

const invert = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    finvert(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const jeopardyQuestion = async (text) => {
    const canvas = createCanvas(1280, 720);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#030e78';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.font = '62px OPTIKorinna Agency';
    const lines = await wrapText(ctx, text.toUpperCase(), 813);
    const topMost = (canvas.height / 2) - (((52 * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((52 + 20) * i);
        ctx.fillStyle = 'black';
        ctx.fillText(lines[i], (canvas.width / 2) + 6, height + 6);
        ctx.fillStyle = 'white';
        ctx.fillText(lines[i], canvas.width / 2, height);
    }
    return canvas.toBuffer();
};

const legoIcon = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'lego-icon.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.beginPath();
    ctx.arc(base.width / 2, base.height / 2, 764 / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const height = 764 / data.width;
    ctx.drawImage(data, (base.width / 2) - (764 / 2), (base.height / 2) - (764 / 2), 764, data.height * height);
    return canvas.toBuffer();
};

const licensePlate = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'license-plate.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '180px LicensePlate';
    ctx.fillText(text.toUpperCase(), base.width / 2, base.height / 2, 700);
    return canvas.toBuffer();
};

const liquidRescale = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.out('-liquid-rescale');
    magik.out('50%');
    magik.implode(0.25);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const noise = async (type, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.noise(type);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const oilPainting = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.paint(5);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const mirror = async (type, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    if (type === 'x') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    } else if (type === 'y') {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
    } else if (type === 'both') {
        ctx.translate(canvas.width, canvas.height);
        ctx.scale(-1, -1);
    }
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
};

const motionBlur = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    fmotionBlur(ctx, data, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const newspaper = async (headline, body) => {
    const { text } = await request
        .post('https://www.fodey.com/generators/newspaper/snippet.asp')
        .attach('name', 'The Daily Whatever')
        .attach('date', moment().format('dddd, MMMM D, YYYY'))
        .attach('headline', headline)
        .attach('text', body);
    const newspaperURL = text.match(/<img src="(https:\/\/r[0-9]+\.fodey\.com\/[0-9]+\/.+\.jpg)"/i)[1];
    const data = await loadImage(newspaperURL);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
};

const pet = async (image) => {
    const frameCount = 10;
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const encoder = new GIFEncoder(112, 112);
    const canvas = createCanvas(112, 112);
    const ctx = canvas.getContext('2d');
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(20);
    encoder.setQuality(200);
    encoder.setTransparent('#000000');
    let squish = 0;
    for (let i = 0; i < frameCount; i++) {
        const frameID = `frame_${i.toString().padStart(2, '0')}.png`;
        const frame = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'pet', frameID));
        const { x, y, width, height } = centerImagePart(data, 75, 75, 27, 38);
        ctx.drawImage(data, x - (squish / 2), y + squish, width + squish, height - squish);
        ctx.drawImage(frame, 0, 0);
        encoder.addFrame(ctx);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (i + 1 > frameCount / 2) squish -= 4;
        else squish += 4;
    }
    encoder.finish();
    const buffer = await streamToArray(stream);
    return Buffer.concat(buffer);
};

const pixelize = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    fpixelize(ctx, canvas, data, 0.15, 0, 0, canvas.width, canvas.height);
    return canvas.toBuffer();
};

const policeTape = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'police-tape.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

const rainbow = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'rainbow.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    ctx.drawImage(base, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const rejected = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'rejected.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

const rotate = async (degrees, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const newDims = adjustCanvasSize(data.width, data.height, degrees);
    const canvas = createCanvas(newDims.width, newDims.height);
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * (Math.PI / 180));
    ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
    ctx.drawImage(data, (canvas.width / 2) - (data.width / 2), (canvas.height / 2) - (data.height / 2));
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-degrees * (Math.PI / 180));
    return canvas.toBuffer();
};

const silouette = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fsilhouette(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const simp = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'simp.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

const speedLimit = async (limit) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'speed-limit.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = '360px HWYGWDE';
    ctx.fillStyle = 'black';
    ctx.fillText(limit.toUpperCase(), 313, 356, 475);
    return canvas.toBuffer();
};

const SpongebobTimeCard = async (text) => {
    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    const num = Math.floor(Math.random() * 23);
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'spongebob-time-card', `${num}.png`));
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '115px Spongeboytt1';
    const lines = await wrapText(ctx, text.toUpperCase(), 1800);
    const topMost = (canvas.height / 2) - (((115 * lines.length) / 2) + ((60 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((115 + 60) * i);
        ctx.fillStyle = '#ecbd3b';
        ctx.fillText(lines[i], (canvas.width / 2) + 6, height + 6);
        ctx.fillStyle = 'black';
        ctx.fillText(lines[i], canvas.width / 2, height);
    }
    return canvas.toBuffer();
};

const spotifyNowPlaying = async (name, artist, image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'spotify-now-playing.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    const height = 504 / data.width;
    ctx.drawImage(data, 66, 132, 504, height * data.height);
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = '25px Noto Bold';
    ctx.fillStyle = 'white';
    ctx.fillText(name, base.width / 2, 685);
    ctx.fillStyle = '#bdbec2';
    ctx.font = '20px Noto Regular';
    ctx.fillText(artist, base.width / 2, 720);
    ctx.fillText('Tamako\'s Picks', base.width / 2, 65);
    return canvas.toBuffer();
};

const squish = async (axis, image) => {
    if (!isImageUrl(image)) return 0;
    axis = axis.toLowerCase();
    let command;
    if (axis === 'x') command = '15%x100%';
    if (axis === 'y') command = '100%x15%';
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.out('-liquid-rescale');
    magik.out(command);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const swirl = async (degrees, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const magik = gm(body);
    magik.swirl(degrees);
    magik.setFormat('png');
    const attachment = await magikToBuffer(magik);
    return attachment;
};

const tint = async (color, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, color, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const undertale = async(character, quote) => {
    character = character.toLowerCase();
    const base = await loadImage(
        join(__dirname, '..', 'resources', 'assets',  'images', 'undertale', `${character}.png`)
    );
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    let font = 'DeterminationMono';
    let space = -3;
    switch (character) {
    case 'sans':
        font = 'UndertaleSans';
        quote = quote.toLowerCase();
        space = -4;
        break;
    case 'papyrus':
        font = 'UndertalePapyrus';
        quote = quote.toUpperCase();
        space = -5;
        break;
    case 'napstablook':
        quote = quote.toLowerCase();
        break;
    case 'gaster':
        font = 'pixelated-wingdings';
        space = -4;
        break;
    case 'ness':
        font = 'apple_kid';
        space = -2;
        break;
    case 'temmie':
        quote = temmize(quote);
        break;
    }
    ctx.font = `32px ${font}`;
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    const text = await wrapText(ctx, quote, 385);
    const lines = text.length > 3 ? 3 : text.length;
    for (let i = 0; i < lines; i++) {
        ctx.fillText(text[i], 174, 22 + (22 * i) + (22 * i) + (space * i));
    }
    return canvas.toBuffer();

};

const wanted = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'wanted.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 430, 430, 150, 360);
    ctx.drawImage(data, x, y, width, height);
    sepia(ctx, x, y, width, height);
    return canvas.toBuffer();
};

const wildPokemon = async (name, image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'wild-pokemon.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 100, 100, 227, 11);
    fpixelize(ctx, canvas, data, 0.30, x, y, width, height);
    fgreyscale(ctx, x, y, width, height);
    ctx.textBaseline = 'top';
    ctx.font = '16px PokemonGb';
    ctx.fillText(name.toUpperCase(), 110, 203, 215);  
    return canvas.toBuffer();
};

const youDied = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'you-died.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, 'black', 0, 0, data.width, data.height);
    fgreyscale(ctx, 0, 0, data.width, data.height);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

function shortenText(ctx, text, maxWidth) { 
    let shorten = false;
    while (ctx.measureText(`${text}...`).width > maxWidth) {
        if (!shorten) shorten = true;
        text = text.substr(0, text.length - 1);
    }
    return shorten ? `${text}...` : text;
}

function magikToBuffer(magik) {
    return new Promise((res, rej) => {
        magik.toBuffer((err, buffer) => {
            if (err) return rej(err);
            return res(buffer);
        });
    });
}

function centerImage(base, data) {
    const dataRatio = data.width / data.height;
    const baseRatio = base.width / base.height;
    let { width, height } = data;
    let x = 0;
    let y = 0;
    if (baseRatio < dataRatio) {
        height = data.height;
        width = base.width * (height / base.height);
        x = (data.width - width) / 2;
        y = 0;
    } else if (baseRatio > dataRatio) {
        width = data.width;
        height = base.height * (width / base.width);
        x = 0;
        y = (data.height - height) / 2;
    }
    return { x, y, width, height };
}

function centerImagePart(data, maxWidth, maxHeight, widthOffset, heightOffest) {
    let { width, height } = data;
    if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height *= ratio;
    }
    if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width *= ratio;
    }
    const x = widthOffset + ((maxWidth / 2) - (width / 2));
    const y = heightOffest + ((maxHeight / 2) - (height / 2));
    return { x, y, width, height };
}

function wrapText(ctx, text, maxWidth) {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) {
                    words[1] = `${temp.slice(-1)}${words[1]}`;
                } else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
                line += `${words.shift()} `;
            } else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}

function sepia(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
        data.data[i] = brightness + 100;
        data.data[i + 1] = brightness + 50;
        data.data[i + 2] = brightness;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function drawImageWithTint(ctx, image, color, x, y, width, height) {
    const { fillStyle, globalAlpha } = ctx;
    ctx.fillStyle = color;
    ctx.drawImage(image, x, y, width, height);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = globalAlpha;
    return ctx;
}

function adjustCanvasSize(width, height, angle) {
    let cos = Math.cos(angle * (Math.PI / 180));
    let sin = Math.sin(angle * (Math.PI / 180));
    if (sin < 0) sin = -sin;
    if (cos < 0) cos = -cos;
    const newWidth = (height * sin) + (width * cos);
    const newHeight = (height * cos) + (width * sin);
    return { width: newWidth, height: newHeight };
}

function fdesaturate(ctx, level, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const dest = ((i * width) + j) * 4;
            const grey = Number.parseInt(
                (0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 1]) + (0.0721 * data.data[dest + 2]), 10
            );
            data.data[dest] += level * (grey - data.data[dest]);
            data.data[dest + 1] += level * (grey - data.data[dest + 1]);
            data.data[dest + 2] += level * (grey - data.data[dest + 2]);
        }
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function fdistort(ctx, amplitude, x, y, width, height, strideLevel = 4) {
    const data = ctx.getImageData(x, y, width, height);
    const temp = ctx.getImageData(x, y, width, height);
    const stride = width * strideLevel;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const xs = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / height)));
            const ys = Math.round(amplitude * Math.cos(2 * Math.PI * 3 * (i / width)));
            const dest = (j * stride) + (i * strideLevel);
            const src = ((j + ys) * stride) + ((i + xs) * strideLevel);
            data.data[dest] = temp.data[src];
            data.data[dest + 1] = temp.data[src + 1];
            data.data[dest + 2] = temp.data[src + 2];
        }
    }
    ctx.putImageData(data, x, y);
    return ctx;
}
function fpixelize(ctx, canvas, image, level, x, y, width, height) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, x, y, width * level, height * level);
    ctx.drawImage(canvas, x, y, width * level, height * level, x, y, width, height);
    ctx.imageSmoothingEnabled = true;
    return ctx;
}

function fgreyscale(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
        data.data[i] = brightness;
        data.data[i + 1] = brightness;
        data.data[i + 2] = brightness;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function finvert(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = 255 - data.data[i];
        data.data[i + 1] = 255 - data.data[i + 1];
        data.data[i + 2] = 255 - data.data[i + 2];
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function  ffishEye(ctx, level, x, y, width, height) {
    const frame = ctx.getImageData(x, y, width, height);
    const source = new Uint8Array(frame.data);
    for (let i = 0; i < frame.data.length; i += 4) {
        const sx = (i / 4) % frame.width;
        const sy = Math.floor(i / 4 / frame.width);
        const dx = Math.floor(frame.width / 2) - sx;
        const dy = Math.floor(frame.height / 2) - sy;
        const dist = Math.sqrt((dx * dx) + (dy * dy));
        const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)));
        const y2 = Math.round((frame.height / 2) - (dy * Math.sin(dist / (level * Math.PI) / 2)));
        const i2 = ((y2 * frame.width) + x2) * 4;
        frame.data[i] = source[i2];
        frame.data[i + 1] = source[i2 + 1];
        frame.data[i + 2] = source[i2 + 2];
        frame.data[i + 3] = source[i2 + 3];
    }
    ctx.putImageData(frame, x, y);
    return ctx;
}

function fmotionBlur(ctx, image, x, y, width, height) {
    ctx.drawImage(image, x, y, width, height);
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 10; i += 2) ctx.drawImage(image, x + i, y, width, height);
    ctx.globalAlpha = 1;
    return ctx;
}

function fcontrast(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    const factor = (259 / 100) + 1;
    const intercept = 128 * (1 - factor);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = (data.data[i] * factor) + intercept;
        data.data[i + 1] = (data.data[i + 1] * factor) + intercept;
        data.data[i + 2] = (data.data[i + 2] * factor) + intercept;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function fsilhouette(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = 0;
        data.data[i + 1] = 0;
        data.data[i + 2] = 0;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function  base64(text, mode = 'encode') {
    if (mode === 'encode') return Buffer.from(text).toString('base64');
    if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
    throw new TypeError(`${mode} is not a supported base64 mode.`);
}

function temmize(text) {
    const dictionary = require(join(__dirname, '..', 'resources', 'assets',  'json', 'temmie.json'));
    return wordTrans(text, dictionary)
        .replaceAll('ing', 'in')
        .replaceAll('ING', 'IN')
        .replaceAll('!', '!!!!111!1!')
        .replaceAll('\'', '');
}

function streamToArray(stream) {
    if (!stream.readable) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        const array = [];
        function onData(data) {
            array.push(data);
        }
        function onEnd(error) {
            if (error) reject(error);
            else resolve(array);
            cleanup();
        }
        function onClose() {
            resolve(array);
            cleanup();
        }
        function cleanup() {
            stream.removeListener('data', onData);
            stream.removeListener('end', onEnd);
            stream.removeListener('error', onEnd);
            stream.removeListener('close', onClose);
        }
        stream.on('data', onData);
        stream.on('end', onEnd);
        stream.on('error', onEnd);
        stream.on('close', onClose);
    });
}

async function detect(imgData) {
    if (Buffer.byteLength(imgData.body) >= 2e+6) return 'size';
    const { body } = await request
        .post('https://api-us.faceplusplus.com/facepp/v3/detect')
        .attach('image_base64', base64(imgData.body))
        .query({
            api_key: process.env.FACEPLUSPLUS_KEY,
            api_secret: process.env.FACEPLUSPLUS_SECRET,
            return_landmark: 1
        });
    if (!body.faces || !body.faces.length) return null;
    return body.faces;
}


function createTransform(ctx, originX, originY, rotation, scale) {
    var x, y;
    x = Math.cos(rotation) * scale;
    y = Math.sin(rotation) * scale;
    ctx.setTransform(x, y, -y, x, originX, originY);
    ctx.translate(-originX, -originY);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

module.exports = {
    minecraftachivement,
    approve,
    axiscult,
    blur,
    bobross,
    brazzers,
    caution,
    certificate,
    charcoal,
    chineserestaurant,
    circle,
    color,
    communist,
    contrast,
    createQr,
    customtext,
    danger,
    dannydevito,
    desaturate,
    dexter,
    distort,
    emboss,
    eyes,
    fireframe,
    fishEye,
    gandhiquote,
    ghost,
    glassshatter,
    glitch,
    greyscale,
    gun,
    hands,
    highwaysign,
    hollywoodstar,
    invert,
    ifunny,
    jeopardyQuestion,
    legoIcon,
    licensePlate,
    liquidRescale,
    mirror,
    motionBlur,
    newspaper,
    noise,
    oilPainting,
    pet,
    pixelize,
    policeTape,
    rainbow,
    rejected,
    rotate,
    silouette,
    simp,
    speedLimit,
    SpongebobTimeCard,
    spotifyNowPlaying,
    squish,
    swirl,
    tint,
    undertale,
    wanted,
    wildPokemon,
    youDied
};