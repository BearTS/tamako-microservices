const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { squish } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    var { axis, image } = req.query;

    var errors = [];
    if (!axis)
        errors.push({ status: 406, details: ['No axis parameter provided', { 'Axis': 'x or y' }] });
    else if (!(axis.toLowerCase() === 'x' || axis.toLowerCase() === 'y')) {
        errors.push({ status: 406, details: ['Invalid axis parameter provided', { 'Axis': 'x or y' }] });
    }

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    axis = axis.toLowerCase();
    
    const id = uuidv4();
    await canvasData.push('edit-image.squish', {
        id,
        axis,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/squish/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.squish');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await squish(data[0].axis, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;