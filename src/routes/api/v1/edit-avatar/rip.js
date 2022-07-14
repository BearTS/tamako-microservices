const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { rip } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const username = req.query.username;
    const cause = req.query.cause;

    if (!username) 
        return errorResponse(req, res, 'Username not provided', 406);
    if (!cause) 
        return errorResponse(req, res, 'Cause not provided', 406);
    if (!avatarURL)
        return errorResponse(req, res, 'avatarURL not provided', 406);

    const id = uuidv4();
    await canvasData.push('edit-avatar.rip', {
        id,
        avatarURL,
        username,
        cause
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/rip/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-avatar.rip');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await rip(data[0].avatarURL, data[0].username, data[0].cause);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;