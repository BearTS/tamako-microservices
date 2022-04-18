const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { steamNowPlayingClassic } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const game = req.query.game;
    
    if (!username) 
        return res.status(406).send(JSON.stringify({ error: 'Username not provided' }));
    if (!game) 
        return res.status(406).send(JSON.stringify({ error: 'Game not provided' }));
    if (!avatarURL)
        return res.status(406).send(JSON.stringify({ error: 'avatarURL not provided' }));

    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        avatarURL,
        username,
        game
    }, 'edit-avatar.steamNowPlayingClassic');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/steamNowPlayingClassic/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-avatar.steamNowPlayingClassic');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await steamNowPlayingClassic(data[0].avatarURL, data[0].username, data[0].game);
        if (image === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;