const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { distractedBF } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL } = req.query;

    var errors = [];
    if (!otherGirlAvatarURL)
        errors.push({ status: 406, details: 'No otherGirlAvatarURL parameter provided' });

    if (!boyfriendAvatarURL)
        errors.push({ status: 406, details: 'No boyfriendAvatarURL parameter provided' });
    
    if (!girlfriendAvatarURL)
        errors.push({ status: 406, details: 'No girlfriendAvatarURL parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.distractedBF', {
        id,
        otherGirlAvatarURL,
        boyfriendAvatarURL,
        girlfriendAvatarURL,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/distracted-boyfriend/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.distractedBF');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await distractedBF(data[0].otherGirlAvatarURL, data[0].boyfriendAvatarURL, data[0].girlfriendAvatarURL);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;