require('dotenv').config();
const { join } = require('path');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const isImageUrl = require('is-image-url');
const { stripIndents } = require('common-tags');

const threekyears = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', '3000-years.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 200, 200, 461, 127);
    ctx.drawImage(data, x, y, width, height);
    return canvas.toBuffer();
};

const alert = async (message) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'alert.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '30px SF Pro Display Medium';
    ctx.fillStyle = '#1f1f1f';
    ctx.textBaseline = 'top';
    let text = await wrapText(ctx, message, 540);
    text = text.length > 3 ? `${text.slice(0, 3).join('\n')}...` : text.join('\n');
    ctx.fillText(text, 48, 178);
    return canvas.toBuffer();
};

const bartChalkboard = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'bart-chalkboard.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.font = '19px akbar';
    ctx.fillStyle = 'white';
    const shortened = shortenText(ctx, text.toUpperCase(), 500);
    const arr = [];
    for (let i = 0; i < 12; i++) arr.push(shortened);
    ctx.fillText(arr.join('\n'), 30, 27);
    return canvas.toBuffer();
};

const beLikeBill = async (name) => {
    const texts = [
        '{{name}} has a girlfriend, but he doesn\'t post 56 photos a day about it. {{name}} likes to keep these things private.',
        '{{name}} is on the internet. {{name}} sees something that offends him. {{name}} moves on.',
        '{{name}} doesn\'t spam his friends with Be Like Bill memes.',
        '{{name}} doesn\'t drive with his fog lights on when it isn\'t foggy. {{name}} knows this is annoying and dazzles other drivers.',
        '{{name}} doesn\'t talk to a friend when that friend just woke up.',
        '{{name}} can afford a Mac but he gets a PC instead because {{name}} is not a dumbass.',
        '{{name}} does not play Candy Crush. {{name}} has a life.',
        '{{name}} is a jerk.',
        '{{name}} wakes up and sees it snowing outside. {{name}} doesn\'t post about it because he knows his friends also have windows.',
        '{{name}} knows tomorrow is Monday. {{name}} doesn\'t post about it, because he knows it happens every week.',
        '{{name}} doesn\'t shout at the TV when football is on. {{name}} knows they can\'t hear him.',
        '{{name}} pays attention in class instead of chatting with his friends on Discord.',
        '{{name}} has a good camera. {{name}} doesn\'t take useless photos and call himself a photographer.',
        '{{name}} doesn\'t beg for his PRs to get merged when he had three merged today.',
        '{{name}} is a bad meme. {{name}} has a good sense of humor about it.',
        '{{name}} likes to play games with his nephew. {{name}} lets him win all the time.',
        '{{name}} meets Della. {{name}} loves Della. Della loves {{name}}. {{name}} and Della dump social networks.',
        '{{name}} sees your picture has only three likes. {{name}} presses like and comments with a compliement.',
        '{{name}} bought a new car. {{name}} doesn\'t post pictures and tag 49 others about it.',
        '{{name}} is nice.',
        '{{name}} has the heart to tell the truth when his friends don\'t look very good.',
        '{{name}} likes dogs. {{name}} doesn\'t bring his dogs to your house uninvited.',
        '{{name}} likes to go bowling. {{name}} doesn\'t put up bumpers.',
        '{{name}} eats pant.',
        '{{name}} likes to use Tamako. {{name}} doesn\'t complain when it goes closed source.',
        '{{name}} loves to buy shoes. {{name}} doesn\'t buy 200 pairs for no reason.',
        '{{name}} doesn\'t like dogs. {{name}} doesn\'t complain on the internet because he knows no one cares.',
        '{{name}}. Enough said.',
        '{{name}} is a butt.',
        '{{name}} knows.',
        '{{name}} uses Discord\'s dark theme so he doesn\'t go blind.'
    ];
	
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'be-like-bill.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '23px arialbd';
    const text = await wrapText(ctx, texts[Math.floor(Math.random() * texts.length)].replaceAll('{{name}}', name), 569);
    ctx.fillText(stripIndents`
			This is ${name}.
			${text.join('\n')}
			${name} is smart.
			Be like ${name}.
		`, 31, 80);
    return canvas.toBuffer();
};

const beautiful = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'beautiful.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.drawImage(avatar, 249, 24, 105, 105);
    ctx.drawImage(avatar, 249, 223, 105, 105);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const boardroomMeeting = async (question, suggestion1, suggestion2, final) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'boardroom-meeting.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.font = '25px Noto Regular';
    ctx.fillText(question, 153, 8, 300);
    ctx.font = '15px Noto Regular';
    ctx.fillText(suggestion1, 30, 251, 90);
    ctx.fillText(suggestion2, 167, 258, 75);
    ctx.fillText(final, 310, 269, 130);
    return canvas.toBuffer();
};

const challenger = async (image, silhouetted) => {
    if (!isImageUrl(image)) return 0;
    const truthy = new Set(['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+']);
    const falsy = new Set(['false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-']);
    if (truthy.has(silhouetted)) silhouetted = true;
    if (falsy.has(silhouetted)) silhouetted = false;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'challenger.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 256, 256, 484, 98);
    ctx.drawImage(silhouetted ? silhouetteImage(data) : data, x, y, width, height);
    return canvas.toBuffer();
};

const changeMyMind = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'change-my-mind.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-24 * (Math.PI / 180));
    ctx.font = '35px Noto Regular';
    let fontSize = 35;
    while (ctx.measureText(text).width > 843) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 337);
    ctx.fillText(lines.join('\n'), 142, 430, 337);
    ctx.rotate(24 * (Math.PI / 180));
    return canvas.toBuffer();
};

const chiIdea = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'chi-idea.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '13px wildwordsroman';
    let fontSize = 15;
    while (ctx.measureText(text).width > 500) {
        fontSize--;
        ctx.font = `${fontSize}px wildwordsroman`;
    }
    const lines = await wrapText(ctx, text, 83);
    const topMost = 137 - (((fontSize * lines.length) / 2) + ((5 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 5) * i);
        ctx.fillText(lines[i], 70, height);
    }
    return canvas.toBuffer();
};

const crush = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'crush.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.rotate(-3.79 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 400, 400, 79, 472);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(3.79 * (Math.PI / 180));
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const cursedSponge = async (amount) => {
    const sponge = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'cursed-sponge.png'));
    const rows = Math.ceil(amount / 10);
    const canvas = createCanvas(sponge.width * (rows > 1 ? 10 : amount), sponge.height * rows);
    const ctx = canvas.getContext('2d');
    let width = 0;
    for (let i = 0; i < amount; i++) {
        const row = Math.ceil((i + 1) / 10);
        ctx.drawImage(sponge, width, sponge.height * (row - 1));
        if ((width + sponge.width) === (sponge.width * (rows > 1 ? 10 : amount))) width = 0;
        else width += sponge.width;
    }
    return canvas.toBuffer();
};

const deepFry = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    desaturate(ctx, -20, 0, 0, data.width, data.height);
    contrast(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer('image/jpeg', { quality: 0.2 });
};

const demotivational = async (title, text, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(750, 600);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const { y, width, height } = centerImagePart(data, 602, 402, 0, 44);
    const x = (canvas.width / 2) - (width / 2);
    ctx.fillStyle = 'white';
    ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    ctx.drawImage(data, x, y, width, height);
    ctx.textAlign = 'center';
    ctx.font = '60px Noto Regular';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(shortenText(ctx, title, 610), 375, 518);
    ctx.font = '27px Noto Regular';
    ctx.fillStyle = 'white';
    ctx.fillText(shortenText(ctx, text, 610), 375, 565);
};

const dislike = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'dislike.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    return canvas.toBuffer();
};

const distractedBF = async (otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL) => {
    if (!isImageUrl(otherGirlAvatarURL) || !isImageUrl(boyfriendAvatarURL) || !isImageUrl(girlfriendAvatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'distracted-boyfriend.png'));
    const boyfriendAvatarData = await request.get(boyfriendAvatarURL);
    const boyfriendAvatar = await loadImage(boyfriendAvatarData.body);
    const girlfriendAvatarData = await request.get(girlfriendAvatarURL);
    const girlfriendAvatar = await loadImage(girlfriendAvatarData.body);
    const otherGirlAvatarData = await request.get(otherGirlAvatarURL);
    const otherGirlAvatar = await loadImage(otherGirlAvatarData.body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-18.06 * (Math.PI / 180));
    ctx.drawImage(boyfriendAvatar, 290, 165, 125, 125);
    ctx.rotate(18.06 * (Math.PI / 180));
    ctx.rotate(3.11 * (Math.PI / 180));
    ctx.drawImage(girlfriendAvatar, 539, 67, 100, 125);
    ctx.rotate(-3.11 * (Math.PI / 180));
    ctx.drawImage(otherGirlAvatar, 120, 96, 175, 175);
    return canvas.toBuffer();
};

const drakePosting = async (nah, yeah) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'drakeposting.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px Noto Regular';
    let fontSize = 50;
    while (ctx.measureText(nah).width > 3003) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const nahLines = await wrapText(ctx, nah, 462);
    const nahTopMost = 256 - (((fontSize * nahLines.length) / 2) + ((10 * (nahLines.length - 1)) / 2));
    for (let i = 0; i < nahLines.length; i++) {
        const height = nahTopMost + ((fontSize + 10) * i);
        ctx.fillText(nahLines[i], 768, height);
    }
    ctx.font = '50px Noto Regular';
    fontSize = 50;
    while (ctx.measureText(yeah).width > 3003) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const yeahLines = await wrapText(ctx, yeah, 462);
    const yeahTopMost = 768 - (((fontSize * yeahLines.length) / 2) + ((10 * (yeahLines.length - 1)) / 2));
    for (let i = 0; i < yeahLines.length; i++) {
        const height = yeahTopMost + ((fontSize + 10) * i);
        ctx.fillText(yeahLines[i], 768, height);
    }
};

const EddFactBook = async (fact) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'edd-facts-book.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(15 * (Math.PI / 180));
    ctx.font = '30px Noto Regular';
    let fontSize = 30;
    while (ctx.measureText(fact).width > 458) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, fact, 183);
    ctx.fillText(lines.join('\n'), 119, 306, 183);
    ctx.rotate(-15 * (Math.PI / 180));
    return canvas.toBuffer();
};

const enslaved = async (name, image) => {
    if (isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'enslaved.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 200, 200, 254, 145);
    ctx.drawImage(data, x, y, width, height);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.font = '50px Noto Regular';
    ctx.fillText(name.toLowerCase(), 365, 400, 240);
    return canvas.toBuffer();
};

const FoodBroke = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'food-broke.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 23, 9, 125, 125);
    contrast(ctx, 23, 9, 125, 125);
    ctx.drawImage(avatar, 117, 382, 75, 75);
    contrast(ctx, 117, 382, 75, 75);
    return canvas.toBuffer();
};

const ForFiveHours = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'for-five-hours.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    return canvas.toBuffer();
};

const genieRules = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'genie-rules.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '40px Noto Regular';
    let fontSize = 40;
    while (ctx.measureText(text).width > 1143) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 381);
    const topMost = 580 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], 220, height);
    }
};

const girlWorthFightingFor = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'girl-worth-fighting-for.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 150, 150, 380, 511);
    ctx.drawImage(data, x, y, width, height);
    return canvas.toBuffer();
};

const gruPlan = async (step1, step2, step3) => {
    const coord = [[450, 129], [1200, 134], [450, 627], [1200, 627]];
    const steps = [step1, step2, step3, step3];
    const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'gru-plan.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    let i = 0;
    for (const [x, y] of coord) {
        ctx.font = '35px Noto Regular';
        const step = steps[i];
        let fontSize = 35;
        while (ctx.measureText(step).width > 1100) {
            fontSize--;
            ctx.font = `${fontSize}px Noto Regular`;
        }
        const lines = await wrapText(ctx, step, 252);
        ctx.fillText(lines.join('\n'), x, y);
        i++;
    }
    return canvas.toBuffer();
};

const iFearNoMan = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'i-fear-no-man.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 169, 169, 167, 330);
    ctx.drawImage(data, x, y, width, height);
    return canvas.toBuffer();
};

const ifThoseKidsCouldRead = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'if-those-kids-could-read.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '40px Noto Regular';
    let fontSize = 40;
    while (ctx.measureText(text).width > 560) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 160);
    const topMost = 140 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], 300, height);
    }
};

const kyonGun = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'kyon-gun.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, base.width, base.height);
    const ratio = data.width / data.height;
    const width = Math.round(base.height * ratio);
    ctx.drawImage(data, (base.width / 2) - (width / 2), 0, width, base.height);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};  

const like = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'like.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    return canvas.toBuffer();
};

const LisaPresentation = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'lisa-presentation.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '40px Noto Regular';
    let fontSize = 40;
    while (ctx.measureText(text).width > 1320) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 330);
    const topMost = 185 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    return canvas.toBuffer();
};

const LookAtThisPhotograph = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'look-at-this-photograph.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-13.5 * (Math.PI / 180));
    ctx.drawImage(data, 280, 218, 175, 125);
    ctx.rotate(13.5 * (Math.PI / 180));
    return canvas.toBuffer();
};

const MarioBrosViews = async (thing, mario, luigi) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'mario-bros-views.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = '47px Noto Regular';
    ctx.fillText(thing, 420, 108, 180);
    ctx.fillStyle = 'white';
    ctx.font = '36px Noto Regular';
    let fontSize = 36;
    while (ctx.measureText(mario).width > 800) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const marioLines = await wrapText(ctx, mario, 200);
    const marioTopMost = 450 - (((fontSize * marioLines.length) / 2) + ((20 * (marioLines.length - 1)) / 2));
    for (let i = 0; i < marioLines.length; i++) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        const height = marioTopMost + ((fontSize + 20) * i);
        ctx.strokeText(marioLines[i], 205, height);
        ctx.fillText(marioLines[i], 205, height);
    }
    ctx.font = '36px Noto Regular';
    fontSize = 36;
    while (ctx.measureText(luigi).width > 800) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const luigiLines = await wrapText(ctx, luigi, 200);
    const luigiTopMost = 450 - (((fontSize * luigiLines.length) / 2) + ((20 * (luigiLines.length - 1)) / 2));
    for (let i = 0; i < luigiLines.length; i++) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        const height = luigiTopMost + ((fontSize + 20) * i);
        ctx.strokeText(luigiLines[i], 450, height);
        ctx.fillText(luigiLines[i], 450, height);
    }
    return canvas.toBuffer();
};

const memeGenClassic = async (top, bottom, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const fontSize = Math.round(base.height / 10);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const topLines = await wrapText(ctx, top, base.width - 10);
    if (!topLines) return 406;
    for (let i = 0; i < topLines.length; i++) {
        const textHeight = (i * fontSize) + (i * 10);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText(topLines[i], base.width / 2, textHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(topLines[i], base.width / 2, textHeight);
    }
    const bottomLines = await wrapText(ctx, bottom, base.width - 10);
    if (!bottomLines) return 406;
    ctx.textBaseline = 'bottom';
    const initial = base.height - ((bottomLines.length - 1) * fontSize) - ((bottomLines.length - 1) * 10);
    for (let i = 0; i < bottomLines.length; i++) {
        const textHeight = initial + (i * fontSize) + (i * 10);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText(bottomLines[i], base.width / 2, textHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(bottomLines[i], base.width / 2, textHeight);
    }
    return canvas.toBuffer();
};

const memeGenModern = async (text, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.font = '40px Noto Regular';
    const lines = await wrapText(ctx, text, base.width - 10);
    const lineBreakLen = text.split('\n').length;
    const linesLen = (40 * lines.length)
				+ (40 * (lineBreakLen - 1))
				+ (14 * lines.length)
				+ (14 * (lineBreakLen - 1))
				+ 14;
    canvas.height += linesLen;
    ctx.font = '40px Noto Regular';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, linesLen);
    ctx.fillStyle = 'black';
    ctx.fillText(lines.join('\n'), 5, 5);
    ctx.drawImage(base, 0, linesLen);
    return canvas.toBuffer();
};

const metamorphosis = async (name, image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'metamorphosis.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 200, 200, 412, 257);
    ctx.drawImage(data, x, y, width, height);
    ctx.textBaseline = 'top';
    ctx.font = '20px Noto Regular';
    ctx.fillText(`le ${name.toLowerCase()}`, 345, 466, 330);
    return canvas.toBuffer();
};

const MyCollectionGrows = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'my-collection-grows.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.rotate(-14 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 425, 425, 145, 179);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(14 * (Math.PI / 180));
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const newPassword = async (weak, strong) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'new-password.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '60px Noto Regular';
    ctx.fillText(shortenText(ctx, weak, 780), 70, 191);
    ctx.fillText(shortenText(ctx, strong, 780), 70, 667);
    return canvas.toBuffer();
};

const nikeAd = async (image, something, sacrifice) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'nike-ad.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, 'black', 0, 0, data.width, data.height);
    greyscale(ctx, 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = data.width / 3;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, (data.width / 2) - (width / 2), data.height - height, width, height);
    const fontSize = Math.round(data.height / 25);
    ctx.font = `${fontSize}px Noto Regular`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    const lines = await wrapText(ctx, `Believe in ${something}. Even if it means ${sacrifice}.`, data.width - 20);
    if (!lines) return 406;
    const initial = data.height / 2;
    for (let i = 0; i < lines.length; i++) {
        const textHeight = initial + (i * fontSize) + (i * 10);
        ctx.fillText(lines[i], data.width / 2, textHeight);
    }
    return canvas.toBuffer();
};

const PanikKalmPanik = async (panik, kalm, panik2) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'panik-kalm-panik.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '40px Noto Regular';
    let fontSize = 40;
    while (ctx.measureText(panik).width > 1136) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const panikLines = await wrapText(ctx, panik, 284);
    const panikTopMost = 130 - (((fontSize * panikLines.length) / 2) + ((10 * (panikLines.length - 1)) / 2));
    for (let i = 0; i < panikLines.length; i++) {
        const height = panikTopMost + ((fontSize + 10) * i);
        ctx.fillText(panikLines[i], 150, height);
    }
    ctx.font = '40px Noto Regular';
    fontSize = 40;
    while (ctx.measureText(kalm).width > 1136) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const kalmLines = await wrapText(ctx, kalm, 284);
    const kalmTopMost = 430 - (((fontSize * kalmLines.length) / 2) + ((10 * (kalmLines.length - 1)) / 2));
    for (let i = 0; i < kalmLines.length; i++) {
        const height = kalmTopMost + ((fontSize + 10) * i);
        ctx.fillText(kalmLines[i], 150, height);
    }
    ctx.font = '40px Noto Regular';
    fontSize = 40;
    while (ctx.measureText(panik2).width > 1136) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const panik2Lines = await wrapText(ctx, panik2, 284);
    const panik2TopMost = 730 - (((fontSize * panik2Lines.length) / 2) + ((10 * (panik2Lines.length - 1)) / 2));
    for (let i = 0; i < panik2Lines.length; i++) {
        const height = panik2TopMost + ((fontSize + 10) * i);
        ctx.fillText(panik2Lines[i], 150, height);
    }
    return canvas.toBuffer();
};

const PhoebeTeachingJoey = async (correct, incorrect) => {
    correct = parsecorrect(correct);
    const coord = [
        [[136, 135], [416, 135]],
        [[136, 328], [416, 328]],
        [[136, 517], [416, 517]],
        [[136, 712], [416, 712]]
    ];
    const steps = [...correct, incorrect];
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'phoebe-teaching-joey.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    let i = 0;
    for (const coords of coord) {
        let j = 0;
        for (const [x, y] of coords) {
            ctx.font = '20px Noto Regular';
            let step = steps[i];
            if (step === incorrect && j === 0) step = correct.join(' ');
            let fontSize = 20;
            while (ctx.measureText(step).width > 260) {
                fontSize--;
                ctx.font = `${fontSize}px Noto Regular`;
            }
            ctx.strokeText(step, x, y, 260);
            ctx.fillText(step, x, y, 260);
            j++;
        }
        i++;
    }
    return canvas.toBuffer();
};

function parsecorrect(correct) {
    const words = correct.split(' ');
    const divided = Math.floor(words.length / 3);
    const first = words.slice(0, divided).join(' ');
    const second = words.slice(divided, divided * 2).join(' ');
    const third = words.slice(divided * 2, words.length).join(' ');
    return [first, second, third];
}

const pills = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'pills.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '32px Noto Regular';
    let fontSize = 32;
    while (ctx.measureText(text).width > 1260) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 280);
    const topMost = 455 - (((fontSize * lines.length) / 2) + ((10 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        const height = topMost + ((fontSize + 10) * i);
        ctx.strokeText(lines[i], 183, height);
        ctx.fillText(lines[i], 183, height);
    }
};

const PlanktonPlan = async (step1, step2, step3) => {
    const coord = [[240, 63], [689, 63], [705, 383], [220, 380]];
    const steps = [step1, step2, step3, step3];
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'plankton-plan.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    let i = 0;
    for (const [x, y] of coord) {
        ctx.font = '35px Noto Regular';
        const step = steps[i];
        let fontSize = 35;
        while (ctx.measureText(step).width > 420) {
            fontSize--;
            ctx.font = `${fontSize}px Noto Regular`;
        }
        const lines = await wrapText(ctx, step, 155);
        ctx.fillText(lines.join('\n'), x, y);
        i++;
    }
    return canvas.toBuffer();
};

const pogchamp = async (amount) => {
    const pog = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'pogchamp.png'));
    const rows = Math.ceil(amount / 10);
    const canvas = createCanvas(pog.width * (rows > 1 ? 10 : amount), pog.height * rows);
    const ctx = canvas.getContext('2d');
    let width = 0;
    for (let i = 0; i < amount; i++) {
        const row = Math.ceil((i + 1) / 10);
        ctx.drawImage(pog, width, pog.height * (row - 1));
        if ((width + pog.width) === (pog.width * (rows > 1 ? 10 : amount))) width = 0;
        else width += pog.width;
    }
    return canvas.toBuffer();
};

const ScrollOfTruth = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'scroll-of-truth.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '60px Noto Regular';
    let fontSize = 60;
    while (ctx.measureText(text).width > 542) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 217);
    const topMost = 850 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], 350, height);
    }
    return canvas.toBuffer();
};

const SkyrimSkill = async (skill, image) => {
    skill = skill.toUpperCase();
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'skyrim-skill.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    ctx.font = '77px Futura Condensed';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(skill, 189 + 5, height + 75 + 3, 300);
    ctx.fillStyle = 'white';
    ctx.fillText(skill, 189, height + 75, 300);
    return canvas.toBuffer();
};

const SonicSays = async (text) => {
    const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'sonic-says.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.font = '24px Noto Regular';
    let fontSize = 24;
    while (ctx.measureText(text).width > 648) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 185);
    ctx.fillStyle = 'white';
    ctx.fillText(lines.join('\n'), 92, 67, 185);
    return canvas.toBuffer();
};

const soraSelfie = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'sora-selfie.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, base.width, base.height);
    const ratio = data.width / data.height;
    const width = Math.round(base.height * ratio);
    ctx.drawImage(data, (base.width / 2) - (width / 2), 0, width, base.height);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const sos = async (message) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'sos.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '90px SunDried';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rotate(15 * (Math.PI / 180));
    let fontSize = 90;
    while (ctx.measureText(message).width > 140) {
        fontSize--;
        ctx.font = `${fontSize}px SunDried`;
    }
    ctx.fillText(message.toUpperCase(), 362, 522);
    ctx.rotate(-15 * (Math.PI / 180));
    return canvas.toBuffer();
};

const SpidermanPointing = async (first, second) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'spiderman-pointing.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px Noto Regular';
    ctx.fillStyle = 'white';
    let fontSize = 50;
    while (ctx.measureText(first).width > 725) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, first, 290);
    const topMost = 189 - (((fontSize * lines.length) / 2) + ((10 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        const height = topMost + ((fontSize + 10) * i);
        ctx.strokeText(lines[i], 222, height);
        ctx.fillText(lines[i], 222, height);
    }
    ctx.font = '50px Noto Regular';
    fontSize = 50;
    while (ctx.measureText(second).width > 725) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines2 = await wrapText(ctx, second, 290);
    const topMost2 = 190 - (((fontSize * lines2.length) / 2) + ((10 * (lines2.length - 1)) / 2));
    for (let i = 0; i < lines2.length; i++) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        const height = topMost2 + ((fontSize + 10) * i);
        ctx.strokeText(lines2[i], 596, height);
        ctx.fillText(lines2[i], 596, height);
    }
    return canvas.toBuffer();
};

const SpongebobBurn = async (burn, person) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'spongebob-burn.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.font = '35px Noto Regular';
    let fontSize = 35;
    while (ctx.measureText(burn).width > 400) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, burn, 180);
    ctx.fillText(lines.join('\n'), 55, 103);
    ctx.font = '25px Noto Regular';
    ctx.fillText(person, 382, 26);
    ctx.font = '20px Noto Regular';
    ctx.fillText(person, 119, 405);
    ctx.fillText(person, 439, 434);
};

const ThatSignWontStopMe = async (text) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'that-sign-wont-stop-me.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '62px TragicMarker';
    let fontSize = 62;
    while (ctx.measureText(text).width > 1002) {
        fontSize--;
        ctx.font = `${fontSize}px TragicMarker`;
    }
    const lines = await wrapText(ctx, text, 334);
    const topMost = 240 - (((fontSize * lines.length) / 2) + ((10 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 10) * i);
        ctx.fillText(lines[i], 210, height);
    }
    ctx.font = '16px TragicMarker';
    fontSize = 16;
    while (ctx.measureText(text).width > 264) {
        fontSize--;
        ctx.font = `${fontSize}px TragicMarker`;
    }
    const bLines = await wrapText(ctx, text, 88);
    const bTopMost = 645 - (((fontSize * bLines.length) / 2) + ((2 * (bLines.length - 1)) / 2));
    for (let i = 0; i < bLines.length; i++) {
        const height = bTopMost + ((fontSize + 2) * i);
        ctx.fillText(bLines[i], 280, height);
    }
    return canvas.toBuffer();
};

const ThisGuy = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'this-guy.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 361, 361, 76, 62);
    ctx.drawImage(data, x, y, width, height);
    return canvas.toBuffer();
};

const ThugLife = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'thug-life.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    greyscale(ctx, 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = data.width / 2;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, (data.width / 2) - (width / 2), data.height - height, width, height);
    return canvas.toBuffer();
};

const ToBeContinued = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'to-be-continued.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = canvas.width / 2;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, 0, canvas.height - height, width, height);
    return canvas.toBuffer();
}; 

const TuxedoPooh = async (normal, tuxedo) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'tuxedo-pooh.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px Noto Regular';
    let fontSize = 50;
    while (ctx.measureText(normal).width > 1320) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const normalLines = await wrapText(ctx, normal, 440);
    const normalTopMost = 145 - (((fontSize * normalLines.length) / 2) + ((10 * (normalLines.length - 1)) / 2));
    for (let i = 0; i < normalLines.length; i++) {
        const height = normalTopMost + ((fontSize + 10) * i);
        ctx.fillText(normalLines[i], 570, height);
    }
    ctx.font = '50px Noto Regular';
    fontSize = 50;
    while (ctx.measureText(tuxedo).width > 1320) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const tuxedoLines = await wrapText(ctx, tuxedo, 440);
    const tuxedoTopMost = 436 - (((fontSize * tuxedoLines.length) / 2) + ((10 * (tuxedoLines.length - 1)) / 2));
    for (let i = 0; i < tuxedoLines.length; i++) {
        const height = tuxedoTopMost + ((fontSize + 10) * i);
        ctx.fillText(tuxedoLines[i], 570, height);
    }
    return canvas.toBuffer();
};

const TwoButtons = async (first, second) => {
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'two-buttons.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-12 * (Math.PI / 180));
    ctx.font = '34px Noto Regular';
    let fontSize = 34;
    while (ctx.measureText(first).width > 366) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`; 
    }
    const firstLines = await wrapText(ctx, first, 183);
    let lineOffset = 0;
    for (let i = 0; i < firstLines.length; i++) {
        ctx.fillText(firstLines[i], 25 + lineOffset, 116 + (fontSize * i) + (10 * i), 183);
        lineOffset += 5;
    }
    ctx.font = '34px Noto Regular';
    fontSize = 34;
    while (ctx.measureText(second).width > 244) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const secondLines = await wrapText(ctx, second, 118);
    lineOffset = 0;
    for (let i = 0; i < secondLines.length; i++) {
        ctx.fillText(secondLines[i], 254 + lineOffset, 130 + (fontSize * i) + (10 * i), 118);
        lineOffset += 5;
    }
    ctx.rotate(12 * (Math.PI / 180));
    return canvas.toBuffer();
};

const UltimateTattoo = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'ultimate-tattoo.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-10 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 300, 300, 84, 690);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(10 * (Math.PI / 180));
    return canvas.toBuffer();
};

const VietnamFlashbacks = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'vietnam-flashbacks.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    const ratio = base.width / base.height;
    const width = Math.round(data.height * ratio);
    ctx.drawImage(base, (data.width / 2) - (width / 2), 0, width, data.height);
    ctx.globalAlpha = 0.675;
    ctx.drawImage(data, 0, 0);
    return canvas.toBuffer();
};

const WorseThanHitler = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'worse-than-hitler.png'));
    const { body } = await request.get(image);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 47, 42, 140, 140);
    return canvas.toBuffer();
};

const worthless = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..',  'resources', 'assets', 'images', 'worthless.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(6 * (Math.PI / 180));
    const center1 = centerImagePart(data, 400, 400, 496, 183);
    ctx.drawImage(data, center1.x, center1.y, center1.width, center1.height);
    ctx.rotate(-6 * (Math.PI / 180));
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(160 * (Math.PI / 180));
    ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
    const center2 = centerImagePart(data, 75, 75, 625, 55);
    ctx.drawImage(data, center2.x, center2.y, center2.width, center2.height);
    ctx.rotate(-160 * (Math.PI / 180));
    return canvas.toBuffer();
};

function contrast(ctx, x, y, width, height) {
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

function desaturate(ctx, level, x, y, width, height) {
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

function silhouetteImage(image) {
    if (!hasAlpha(image)) return image;
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    silhouette(ctx, 0, 0, image.width, image.height);
    return canvas;
}

function  silhouette(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = 0;
        data.data[i + 1] = 0;
        data.data[i + 2] = 0;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function hasAlpha(image) {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let hasAlphaPixels = false;
    for (let i = 3; i < data.data.length; i += 4) {
        if (data.data[i] < 255) {
            hasAlphaPixels = true;
            break;
        }
    }
    return hasAlphaPixels;
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

function shortenText(ctx, text, maxWidth) { 
    let shorten = false;
    while (ctx.measureText(`${text}...`).width > maxWidth) {
        if (!shorten) shorten = true;
        text = text.substr(0, text.length - 1);
    }
    return shorten ? `${text}...` : text;
}


module.exports = {
    threekyears,
    alert,
    bartChalkboard,
    beLikeBill,
    beautiful,
    boardroomMeeting,
    challenger,
    changeMyMind,
    chiIdea,
    crush,
    cursedSponge,
    deepFry,
    demotivational,
    dislike,
    distractedBF,
    drakePosting,
    EddFactBook,
    enslaved,
    FoodBroke,
    ForFiveHours,
    genieRules,
    girlWorthFightingFor,
    gruPlan,
    iFearNoMan,
    ifThoseKidsCouldRead,
    kyonGun,
    like,
    LisaPresentation,
    LookAtThisPhotograph,
    MarioBrosViews,
    memeGenClassic,
    memeGenModern,
    metamorphosis,
    MyCollectionGrows,
    newPassword,
    nikeAd,
    PanikKalmPanik,
    PhoebeTeachingJoey,
    pills,
    PlanktonPlan,
    pogchamp,
    ScrollOfTruth,
    SkyrimSkill,
    SonicSays,
    soraSelfie,
    sos,
    SpidermanPointing,
    SpongebobBurn,
    ThatSignWontStopMe,
    ThisGuy,
    ThugLife,
    ToBeContinued,
    TuxedoPooh,
    TwoButtons,
    UltimateTattoo,
    VietnamFlashbacks,
    WorseThanHitler,
    worthless
};