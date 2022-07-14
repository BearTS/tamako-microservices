const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const GIFEncoder = require('gifencoder');
const isImageUrl = require('is-image-url');
const { join } = require('path');
const { MersenneTwister19937, bool } = require('random-js');

const avatarFusion = async (baseAvatarURL, overlayAvatarURL) => {
    if (!isImageUrl(baseAvatarURL) || !isImageUrl(overlayAvatarURL)) return 0;
    const baseAvatarData = await request.get(baseAvatarURL);
    const baseAvatar = await loadImage(baseAvatarData.body);
    const overlayAvatarData = await request.get(overlayAvatarURL);
    const overlayAvatar = await loadImage(overlayAvatarData.body);
    const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 0.5;
    ctx.drawImage(baseAvatar, 0, 0);
    ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
    return canvas.toBuffer();
};

const milk = async (avatarURL, direction) => {
    if (!isImageUrl(avatarURL)) return 0;
    direction = direction.toLowerCase();
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'chocolate-milk.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, base.width, base.height);
    if (direction === 'right') {
        ctx.translate(base.width, 0);
        ctx.scale(-1, 1);
    }
    ctx.drawImage(avatar, 0, 0, 512, 512);
    if (direction === 'right') ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const eject = async (avatarURL, imposter, username, userID) => {
    const truthy = new Set(['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+']);
    const falsy = new Set(['false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-']);
    if (truthy.has(imposter)) imposter = true;
    if (falsy.has(imposter)) imposter = false;
    username = username || 'Not_Provided';
    userID = userID || '000000';
    if (!isImageUrl(avatarURL)) return 0;
    const frameCount = 52;
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    if (imposter === '') {
        const random = MersenneTwister19937.seed(userID);
        imposter = bool()(random);
    }
    const text = `${username} was${imposter ? ' ' : ' not '}An Imposter.`;
    const encoder = new GIFEncoder(320, 180);
    const canvas = createCanvas(320, 180);
    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.font = '18px Noto Regular';
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(100);
    encoder.setQuality(200);
    for (let i = 0; i < frameCount; i++) {
        const frameID = `frame_${i.toString().padStart(2, '0')}.gif`;
        const frame = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'eject', frameID));
        ctx.drawImage(frame, 0, 0);
        if (i <= 17) {
            const x = ((320 / 15) * i) - 50;
            const y = (frame.height / 2) - 25;
            const rotation = (360 / 15) * i;
            const angle = rotation * (Math.PI / 180);
            const originX = x + 25;
            const originY = y + 25;
            ctx.translate(originX, originY);
            ctx.rotate(-angle);
            ctx.translate(-originX, -originY);
            ctx.drawImage(avatar, x, y, 50, 50);
            ctx.translate(originX, originY);
            ctx.rotate(angle);
            ctx.translate(-originX, -originY);
        }
        if (i > 17) {
            if (i <= 27) {
                const letters = Math.ceil(((text.length / 10) * (i - 17)) + 1);
                const toDraw = text.slice(0, letters + 1);
                ctx.fillText(toDraw, frame.width / 2, frame.height / 2, 300);
            } else {
                ctx.fillText(text, frame.width / 2, frame.height / 2, 300);
            }
        }
        encoder.addFrame(ctx);
    }
    encoder.finish();
    const buffer = await streamToArray(stream);
    return Buffer.concat(buffer);
};

const fire = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const frameCount = 31;  
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const encoder = new GIFEncoder(avatar.width, avatar.height);
    const canvas = createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext('2d');
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(100);
    encoder.setQuality(200);
    for (let i = 0; i < frameCount; i += 2) {
        const frameID = `frame-${i.toString().padStart(2, '0')}.png`;
        const frame = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'fire', frameID));
        const ratio = frame.width / frame.height;
        const height = Math.round(avatar.width / ratio);
        drawImageWithTint(ctx, avatar, '#fc671e', 0, 0, avatar.width, avatar.height);
        ctx.drawImage(frame, 0, avatar.height - height, avatar.width, height);
        encoder.addFrame(ctx);
    }
    encoder.finish();
    const buffer = await streamToArray(stream);
    return Buffer.concat(buffer);
};

const hat = async (avatarURL, type, addX, addY, scale) => {
    if (!isImageUrl(avatarURL)) return 0;
    type = type.toLowerCase();
    scale /= 100;
    if (scale === 0) scale = 1;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'hat', `${type}.png`));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(avatar, 0, 0);
    ctx.drawImage(base, 0 + addX, 0 + addY, avatar.width * scale, avatar.height * scale);
    return canvas.toBuffer();
};

const hearts = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'hearts.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, avatar, 'deeppink', 0, 0, avatar.width, avatar.height);
    ctx.drawImage(base, 0, 0, avatar.width, avatar.height);
    return canvas.toBuffer();
};

const heLivesInYou = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'he-lives-in-you.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-24 * (Math.PI / 180));
    drawImageWithTint(ctx, avatar, '#00115d', 75, 160, 130, 150);
    ctx.rotate(24 * (Math.PI / 180));
    return canvas.toBuffer();
};

const iHaveThePower = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images','i-have-the-power.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(18.3 * (Math.PI / 180));
    ctx.drawImage(avatar, 332, -125, 175, 175);
    ctx.rotate(-18.3 * (Math.PI / 180));
    return canvas.toBuffer();
};

const rip = async (avatarURL, username, cause) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'rip.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 194, 399, 500, 500);
    greyscale(ctx, 194, 399, 500, 500);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = '62px CoffinStone';
    ctx.fillStyle = 'black';
    ctx.fillText(username, 438, 330, 500);
    ctx.fillStyle = 'white';
    if (cause) ctx.fillText(cause, 438, 910, 500);
    ctx.font = '37px CoffinStone';
    ctx.fillText('In Loving Memory of', 438, 292);
    return canvas.toBuffer();
};

const sip = async (avatarURL, direction) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'sip.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, base.width, base.height);
    if (direction === 'right') {
        ctx.translate(base.width, 0);
        ctx.scale(-1, 1);
    }
    ctx.drawImage(avatar, 0, 0, 512, 512);
    if (direction === 'right') ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const steamNowPlaying = async (avatarURL, username, game) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'steam-now-playing.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 26, 26, 41, 42);
    ctx.fillStyle = '#90b93c';
    ctx.font = '14px Noto Regular';
    ctx.fillText(username, 80, 34);
    ctx.fillText(shortenText(ctx, game, 200), 80, 70);
    return canvas.toBuffer();
};

const steamNowPlayingClassic = async (avatarURL, username, game) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'steam-now-playing-classic.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 21, 21, 32, 32);
    ctx.fillStyle = '#90ba3c';
    ctx.font = '10px Noto Regular';
    ctx.fillText(username, 63, 26);
    ctx.fillText(shortenText(ctx, game, 160), 63, 54);
    return canvas.toBuffer();
};

const triggered = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const coord1 = [-25, -33, -42, -14];
    const coord2 = [-25, -13, -34, -10];
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'triggered.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const encoder = new GIFEncoder(base.width, base.width);
    const canvas = createCanvas(base.width, base.width);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.width);
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(50);
    encoder.setQuality(200);
    for (let i = 0; i < 4; i++) {
        drawImageWithTint(ctx, avatar, 'red', coord1[i], coord2[i], 300, 300);
        ctx.drawImage(base, 0, 218, 256, 38);
        encoder.addFrame(ctx);
    }
    encoder.finish();
    const buffer = await streamToArray(stream);
    return Buffer.concat(buffer);
};

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

function greyscale(ctx, x, y, width, height) {
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

function shortenText(ctx, text, maxWidth) {
    let shorten = false;
    while (ctx.measureText(`${text}...`).width > maxWidth) {
        if (!shorten) shorten = true;
        text = text.substr(0, text.length - 1);
    }
    return shorten ? `${text}...` : text;
}

module.exports = {
    avatarFusion,
    milk,
    eject,
    fire,
    hat,
    hearts,
    heLivesInYou,
    iHaveThePower,
    rip,
    sip,
    steamNowPlaying,
    steamNowPlayingClassic,
    triggered
};