const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { eyes } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const image = req.query.image;

    if (!image) return errorResponse(req, res, 'No image parameter provided', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.eyes', {
        id,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/eyes/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.eyes');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await eyes(data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL', 406);
        if (buffer === 400) return errorResponse(req, res, 'No faces in this image', 406);
        if (buffer === 2) return errorResponse(req, res, 'Image too large', 406);
        if (buffer === 403) return errorResponse(req, res, 'The route is overloaded! Try again soon', 406);
        if (buffer === 500) return errorResponse(req, res, 'Internal server error', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;