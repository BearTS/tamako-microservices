const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { rotate } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { degrees, image } = req.query;

    var errors = [];
    if (!degrees)
        errors.push({ status: 406, details: 'No degrees parameter provided' });
    else if (isNaN(degrees))
        errors.push({ status: 406, details: 'Invalid degrees, should be a number' });
    else if (degrees < -360 || degrees > 360)
        errors.push({ status: 406, details: 'Degrees should be between -360 and 360' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.rotate', {
        id,
        degrees,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/rotate/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.rotate');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await rotate(data[0].degrees, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;