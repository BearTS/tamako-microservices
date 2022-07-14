const router = require('express').Router();
const path = require('path');
const request = require('node-superfetch');
const randomize = require('../../../controllers/randomize');
const { authorizeUser } = require('../../../middleware/authorize');
const { errorResponse } = require('../../../helper/ApiResponse');

router.get('/', async (req, res) => {
    res.status(404).json({
        message: 'Welcome to Tamako API!',
        base_url: `${req.protocol}://${req.get('host')}/api/v1`,
        documentation: 'https://tamako.tech/docs/api/chatapi',
        endpoints: [
            'GET: /api/joke',
            'GET: /api/animalfact',
            'GET: /api/images',
            'GET: /api/roleplay',
            'GET: /api/chat',
            'GET: /api/randomizer',
            'GET: /api/edit-avatar/:type',
            'GET: /api/edit-image/:type',
            'GET: /api/edit-meme/:type',
            'GET: /api/events/:type',
            'GET: /api/search:type'
        ],
        owner: [
            {
                author: 'BearTS',
                github: 'https://github.com/BearTS'
            }
        ]
    });
});

// joke
router.get('/joke', authorizeUser, async (req,res) => {
    try {
        res.status(200).json({ 
            Api: 'Tamako API',
            Type: 'Joke API',
            joke: `${randomize(path.join(__dirname, '..', '..', '..', 'resources', 'assets', 'json' , 'jokeapi', 'am9rZ.json'))}`
        });
    } catch (error) {
        errorResponse(req, res, error.message, 500);
    }
});

// animalfact
router.get('/animalfact', authorizeUser, async (req,res) => {
    const animalfactA = ['bird', 'bunny', 'cat', 'dog', 'fox', 'giraffe', 'kangaroo', 'koala', 'panda', 'racoon', 'whale'];

    var animal = req.query.animal;
    try {
        if (animalfactA.includes(animal)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Animal Fact API',
                fact: `${randomize(path.join(__dirname, '..', '..', '..', 'resources', 'assets', 'json' , 'animalfact', `${animal}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Animal Fact API',
                message: 'Animal not found!',
                available: animalfactA
            });
        }
    } catch(error) {
        errorResponse(req, res, error.message, 500);
    }
});

// Images
router.get('/images/:type', authorizeUser, async (req,res) => {
    const imagesA = ['bird', 'cat', 'dog', 'fox','koala', 'mai', 'mai-nsfw', 'panda', 'redpanda', 'sabrina', 'tamako', 'tamako-nsfw', 'waifu'];

    var type = req.params.type;
    try {
        if (imagesA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Images API',
                url: `${randomize(path.join(__dirname, '..', '..', '..', 'resources', 'assets', 'json' , 'image', `${type}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Image API',
                message: 'Type not found!',
                available: imagesA
            });
        }
    } catch (error) {
        errorResponse(req, res, error.message, 500);
    }
});

// roleplay
router.get('/roleplay/:type', authorizeUser, async (req,res) => {
    const roleplayA = ['baka', 'blush', 'bite', 'celebrate', 'cry', 'dance', 'disgust', 'eat', 'explode', 'feed', 'fistbump', 'happy', 'highfive', 'holdhands', 'hug', 'hug', 'inhale', 'kill', 'kiss', 'lick', 'midfing', 'pat', 'poke', 'punch', 'slap', 'sleep', 'smile', 'smug', 'suicide', 'tickle', 'wave', 'wink'];
    var type = req.params.type;
    try {
        if (roleplayA.includes(type)) {
            res.status(200).json({ 
                Api: 'Tamako API',
                Type: 'Roleplay API',
                url: `${randomize(path.join(__dirname, '..', '..', '..', 'resources', 'assets', 'json' , 'roleplay', `${type}.json`))}`
            });
        } else {
            res.status(404).json({ 
                Api: 'Tamako API',
                Type: 'Roleplay API',
                message: 'Type not found!',
                available: roleplayA
            });    
        }
    } catch (error) {
        errorResponse(req, res, error.message, 500);
    }
});

router.get('/chat', authorizeUser, async (req,res) => {
    const regex = new RegExp(/\d{18}/g);
    // const token = req.query.token;
    const message = req.query.message;
    const user = req.query.userid || '000000000000000000';
    const gender = req.query.gender || 'female';
    const name = req.query.name || 'Tamako';
    const prefix = req.query.prefix || 'No prefix set';
    const dev = req.query.dev || 'Bear#3437';
    if (!regex.test(user)) return res.status(400).json({ message: 'Invalid user id!' });
    try {
        // if (!token) return res.status(400).json({ 'message': 'Token is required' });
        if (!message) return res.status(400).json({ 'message': 'Message is required' });
        const output = await chat(user, message);
        const respond = output
            .replace(/<@&?([0-9]+)>/gm, '')
            .replace(/<@!?([0-9]+)>/gm, '')
            .replace('TamakoAPI', name)
            .replace('thisisprefix', prefix)
            .replace('iammaster', dev)
            .replace('female chatbot', `${gender}  chatbot`)
            .replace(process.env.str1, process.env.rep1)
            .replace([process.env.str2, process.env.str3, process.env.str4], process.env.rep2)
            .replace(process.env.str5, process.env.rep3)
            .replace(process.env.str6, process.env.rep4)
            .replace(process.env.str7, process.env.rep5)
            .replace([process.env.str8, process.env.str9], ' ')
            .replace(process.env.str10, process.env.rep6);
        
        res.status(200).json({
            Api: 'Tamako API',
            Type: 'Chat API',
            input: message,
            userid: user === '000000000000000000' ? 'None Provided' : user,
            message: respond
        });
    } catch (error) {
        errorResponse(req, res, error.message, 500);
    }
});

async function chat(userid, message) {
    const respond = await request.get(`${process.env.CHATBRAIN}&uid=${encodeURIComponent(userid)}&msg=${encodeURIComponent(message)}`);
    return respond.body.cnt;
}

// Routes for other endpoints
router.use('/canvas/edit-avatar', require('./edit-avatar/main'));
router.use('/canvas/edit-meme', require('./edit-meme/main'));
router.use('/canvas/edit-image', require('./edit-image/main'));
router.use('/edit-text', require('./edit-text'));
router.use('/events', require('./events'));
router.use('/search', require('./search'));

module.exports = router;