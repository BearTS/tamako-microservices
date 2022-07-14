const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { tint } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    var { color, image } = req.query;

    var errors = [];
    if (!color)
        errors.push({ status: 406, details: 'No color parameter provided' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    color = color.toLowerCase();
    
    const id = uuidv4();
    await canvasData.push('edit-image.tint', {
        id,
        color,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/tint/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.tint');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await tint(data[0].color, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;