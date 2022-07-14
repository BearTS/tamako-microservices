const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { desaturate } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { level, image } = req.query;

    var errors = [];
    if (!level)
        errors.push({ status: 406, details: 'No level parameter provided' });
    else if (isNaN(level))
        errors.push({ status: 406, details: 'Invalid level, should be a number' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.desaturate', {
        id,
        level,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/desaturate/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.desaturate');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await desaturate(data[0].level, data[0].image);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;