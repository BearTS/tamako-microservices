const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { milk } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const direction = req.query.direction;

    if (direction !== 'left' && direction !== 'right')
        return errorResponse(req, res, 'Invalid direction', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-avatar.milk', {
        id,
        avatarURL,
        direction
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/milk/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-avatar.milk');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await milk(data[0].avatarURL, data[0].direction);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;