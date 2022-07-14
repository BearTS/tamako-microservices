const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { noise } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    var { type, image } = req.query;

    var errors = [];
    const types = ['uniform', 'gaussian', 'multiplicative', 'impulse', 'laplacian', 'poisson'];

    if (!type)
        errors.push({ status: 406, details: 'No type parameter provided' });
    else if (!types.includes(type.toLowerCase()))
        errors.push({ status: 406, details: ['Invalid type', { 'Available Types': types }]});

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    type = type.toLowerCase();
    
    const id = uuidv4();
    await canvasData.push('edit-image.noise', {
        id,
        type,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/noise/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.noise');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await noise(data[0].type, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpeg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;