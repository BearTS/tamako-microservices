const router = require('express').Router();
const { 
    minecraftachivement,
    approve,
    axiscult,
    blur,
    bobross,
    brazzers,
    caution,
    certificate,
    chineserestaurant,
    circle,
    color,
    communist,
    contrast,
    createQr,
    danger,
    dannydevito,
    desaturate,
    dexter,
    distort,
    eyes,
    fireframe,
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
    mirror,
    motionBlur,
    newspaper,
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
    tint,
    wanted,
    youDied
} = require('../Functions/edit-image');

router.get('/achievement/:text', async (req, res) => {
    const input = req?.params?.text;
    if (!input || input.length > 50) return res.status(400).send(JSON.stringify({ error: 'Invalid input' }));
    try {
        const image = await minecraftachivement(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/approve', async (req, res) => {
    const url = req.query.image;
    try {
        const image = await approve(url);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/axis-cult', async (req, res) => {
    const username = req.query.username;
    let gender = req.query.gender;
    gender = gender.toLowerCase();
    const age = req.query.age;
    const profession = req.query.profession;
    if (!(gender === 'male' || gender === 'female')) return res.status(406).send(JSON.stringify({ error: 'No gender provided'}));
    if (age < 1 || age > 1000) return res.status(406).send(JSON.stringify({ error: 'Invalid Age'}));
    if (profession.length > 15) return res.status(406).send(JSON.stringify({ error: 'Enter a profession less than 15 characters'}));
    if (!username) return res.status(406).send(JSON.stringify({ error: 'Enter a username'}));
    try {
        const image = await axiscult(username, gender, age, profession);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/blur', async (req, res) => {
    const radius = req.query.radius;
    const image = req.query.image; 
    if (radius < 1 || radius > 180) return res.status(406).send(JSON.stringify({ error: 'Provide radius between 1 and 180'}));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const imageBlur = await blur(radius, image);
        if (imageBlur === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/bobross', async (req, res) => {
    const image = req.query.image; 
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const imageBlur = await bobross(image);
        if (imageBlur === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(imageBlur);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/brazzers', async (req, res) => {
    const image = req.query.image; 
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await brazzers(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/caution', async (req, res) => {
    const text = req.query.text; 
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text must be less than 500 characters'}));
    try {
        const buffer = await caution(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/certificate', async (req, res) => {
    const reason = req.query.reason;
    const name = req.query.name;
    if (!reason.length || reason.length > 30) return res.status(406).send(JSON.stringify({ error: 'Invalid reason, should be less than 30 characters'}));
    if (!name.length || name.length > 30) return res.status(406).send(JSON.stringify({ error: 'Invalid name, should be less than 30 characters'}));
    try {
        const buffer = await certificate(reason, name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/chineserestaurant', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    try {
        const buffer = await chineserestaurant(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/circle', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await circle(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/color', async (req, res) => {
    const input = req.query.color;
    if (!input) return res.status(406).send(JSON.stringify({ error: 'No color provided, #colorcode or name'}));
    try {
        const buffer = await color(input);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/communist', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await communist(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/contrast', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await contrast(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/createqr', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    try {
        const buffer = await createQr(text);
        if (buffer === 0) return res.status(500).send(JSON.stringify({ error: 'some error occured' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/danger', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text must be less than 500 characters'}));
    try {
        const buffer = await danger(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/devito', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await dannydevito(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 400) return res.status(406).send(JSON.stringify({ error: 'No faces in this image' }));
        if (buffer === 2) return res.status(406).send(JSON.stringify({ error: 'Image too large' }));
        if (buffer === 403) return res.status(406).send(JSON.stringify({ error: 'The command is overloaded! Try again soon' }));
        if (buffer === 500) return res.status(500).send(JSON.stringify({ error: 'Internal server error' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/desaturate', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    if (isNaN(level)) return res.status(406).send(JSON.stringify({ error: 'Invalid level, should be a number'}));
    try {
        const buffer = await desaturate(level, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/dexter', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await dexter(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/distort', async (req, res) => {
    const level = req.query.level;
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    if (isNaN(level)) return res.status(406).send(JSON.stringify({ error: 'Invalid level, should be a number'}));
    try {
        const buffer = await distort(level, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/eyes', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await eyes(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 400) return res.status(406).send(JSON.stringify({ error: 'No faces in this image' }));
        if (buffer === 2) return res.status(406).send(JSON.stringify({ error: 'Image too large' }));
        if (buffer === 403) return res.status(406).send(JSON.stringify({ error: 'The command is overloaded! Try again soon' }));
        if (buffer === 500) return res.status(500).send(JSON.stringify({ error: 'Internal server error' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/fireframe', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await fireframe(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/gandhiquote', async (req, res) => {
    const quote = req.query.quote;
    if (!quote) return res.status(406).send(JSON.stringify({ error: 'No quote provided'}));
    if (quote.length > 500) return res.status(406).send(JSON.stringify({ error: 'Quote too long'}));
    try {
        const buffer = await gandhiquote(quote);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/ghost', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await ghost(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/glass-shatter', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await glassshatter(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/glitch', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await glitch(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/greyscale', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await greyscale(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/gun', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await gun(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/hands', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await hands(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/highwaysign', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    try {
        const buffer = await highwaysign(text);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid text' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/hollywoodstar', async (req, res) => {
    const name = req.query.name;
    if (!name) return res.status(406).send(JSON.stringify({ error: 'No name provided'}));
    if (name.length > 30) return res.status(406).send(JSON.stringify({ error: 'Name too long'}));
    try {
        const buffer = await hollywoodstar(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/ifunny', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await ifunny(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/invert', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await invert(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/jeopardyQuestion', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Characters should be less than 500'}));
    try {
        const buffer = await jeopardyQuestion(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/legoIcon', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await legoIcon(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/licensePlate', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text.length > 10) return res.status(406).send(JSON.stringify({ error: 'characters should be less than 10'}));
    try {
        const buffer = await licensePlate(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/mirror', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    let type = req.query.type;
    if (!type) return res.status(406).send(JSON.stringify({ error: 'No type provided'}));
    type = type.toLowerCase();
    if (!(type === 'x' || type === 'y' || type == 'both')) return res.status(406).send(JSON.stringify({ error: 'Type should be x or y or both'}));
    try {
        const buffer = await mirror(type, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/motionBlur', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await motionBlur(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/newspaper', async (req, res) => {
    const headline = req.query.headline;
    const body = req.query.body;
    if (!headline) return res.status(406).send(JSON.stringify({ error: 'No headline provided'}));
    if (!body) return res.status(406).send(JSON.stringify({ error: 'No body provided'}));
    if (headline.length > 20) return res.status(406).send(JSON.stringify({ error: 'Headline should be less than 20'}));
    try {
        const buffer = await newspaper(headline, body);
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/pet', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await pet(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/gif' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/pixelize', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await pixelize(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/policeTape', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await policeTape(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/rainbow', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await rainbow(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/rejected', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await rejected(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/rotate', async (req, res) => {
    const degrees = req.query.degrees;
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    if (!degrees) return res.status(406).send(JSON.stringify({ error: 'No degrees provided'}));
    if (degrees < -360 || degrees > 360) return res.status(406).send(JSON.stringify({ error: 'Degrees should be between -360 and 360'}));
    try {
        const buffer = await rotate(degrees, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/silouette', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await silouette(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/simp', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await simp(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/speedLimit', async (req, res) => {
    const limit = req.query.limit;
    if (!limit) return res.status(406).send(JSON.stringify({ error: 'No limit provided'}));
    if (limit.length > 5) return res.status(406).send(JSON.stringify({ error: 'String should be less than 5 characters'}));
    try {
        const buffer = await speedLimit(limit);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/spongebobTimeCard', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided'}));
    if (text.length > 280) return res.status(406).send(JSON.stringify({ error: 'String should be less than 280 characters'}));
    try {
        const buffer = await SpongebobTimeCard(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/spotifyNowPlaying', async (req, res) => {
    const name = req.query.name;
    const artist = req.query.artist;
    const image = req.query.image;
    if (!name) return res.status(406).send(JSON.stringify({ error: 'No name provided'}));
    if (!artist) return res.status(406).send(JSON.stringify({ error: 'No artist provided'}));
    if (name.length > 50 || artist.length > 50) return res.status(406).send(JSON.stringify({ error: 'String should be less than 50 characters'}));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await spotifyNowPlaying(name, artist, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/tint', async (req, res) => {
    let color = req.query.color;
    color = color.toLowerCase();
    const image = req.query.image;
    if (!color) return res.status(406).send(JSON.stringify({ error: 'No color provided'}));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await tint(color, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/wanted', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await wanted(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/youDied', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'No image provided'}));
    try {
        const buffer = await youDied(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' })); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;