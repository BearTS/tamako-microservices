const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { avatarFusion } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { base, overlay } = req.query;
    
    const id = uuidv4();
    await canvasData.push('edit-avatar.avatarFusion', {
        id,
        base,
        overlay
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/avatarFusion/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-avatar.avatarFusion');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await avatarFusion(data[0].base, data[0].overlay);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;