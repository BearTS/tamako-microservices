const router = require('express').Router();
const { hex } = require('random-js');
const {
    binary,
    base64,
    braille,
    bronySpeak,
    cowSay,
    cursive,
    Dvorak,
    emojify,
    fancy,
    mocking,
    morse,
    owo,
    reverse,
    shortenURl,
    superscript,
    yodaSpeak,
    upsideDown,
    shipName
} = require('../../../controllers/edit-text');
const { errorResponse } = require('../../../helper/ApiResponse');

router.get('/base64', async (req, res) => {
    let { mode, text } = req.query;
    if (!mode) mode = 'encode';

    var errors = [];
    if (!mode) mode = 'encode';
    if (!(mode.toLowerCase() === 'encode' || mode.toLowerCase() === 'decode'))
        errors.push({ status: 406, details: 'Invalid mode, should be encode or decode' });

    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    try {
        const result = await base64(mode.toLowerCase(), text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/binary', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await binary(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/braille', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await braille(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/brony-speak', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await bronySpeak(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/clap', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = text.replaceAll(' ', ' 👏 ');
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/cow-say', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await cowSay(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/cursive', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await cursive(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/dvorak', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await Dvorak(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/emojify', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await emojify(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/fancy', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await fancy(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/hex', async (req, res) => { // How does work?
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await hex(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/mocking', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await mocking(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/morse', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await morse(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/owo', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await owo(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/reverse', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await reverse(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/shortenURL', async (req, res) => {
    const { url } = req.query;
    if (!url) return errorResponse(req, res, 'No url parameter provided');
    if (encodeURI(url).length > 2083) return errorResponse(req, res, 'URL must be less than 2083 characters');
    try {
        const result = await shortenURl(url);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ship', async (req, res) => {
    let { person1, person2 } = req.query;

    var errors = [];
    if (!person1)
        errors.push({ status: 406, details: 'No person1 parameter provided' });
    else if (person1.toLowerCase().length > 500)
        errors.push({ status: 406, details: 'Person1 must be less than 500 characters' });

    if (!person2)
        errors.push({ status: 406, details: 'No person2 parameter provided' });
    else if (person2.toLowerCase().length > 500)
        errors.push({ status: 406, details: 'Person2 must be less than 500 characters' });

    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    try {
        const result = await shipName(person1.toLowerCase(), person2.toLowerCase());
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/superscript', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await superscript(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/yodaSpeak', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await yodaSpeak(text); // Yoda API Internal Error
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/upsideDown', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'No text parameter provided');
    try {
        const result = await upsideDown(text);
        res.status(200).send({ response: result });
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

module.exports = router;