const router = require('express').Router();

// /api
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

// API Version 1
router.use('/v1', require('./v1/main'));

// API Version 2 (soon lol)
// router.use('/v2', require('./v2/main'));

module.exports = router;