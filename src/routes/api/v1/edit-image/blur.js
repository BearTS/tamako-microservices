const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { blur } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { radius, image } = req.query;

    var errors = [];
    if (!radius)
        errors.push({ status: 406, details: 'No radius parameter provided' });
    else if (radius < 1 || radius > 180)
        errors.push({ status: 406, details: 'Provide radius between 1 and 180' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.blur', {
        id,
        radius,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/blur/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.blur');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await blur(data[0].radius, data[0].image);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;