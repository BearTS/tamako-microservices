const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { heLivesInYou } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;

    if (!avatarURL)
        return errorResponse(req, res, 'avatarURL not provided', 406);

    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        avatarURL,
    }, 'edit-avatar.heLivesInYou');

    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/heLivesInYou/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-avatar.heLivesInYou');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await heLivesInYou(data[0].avatarURL);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;