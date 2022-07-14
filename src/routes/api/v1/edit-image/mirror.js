const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { mirror } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { image } = req.query;
    let type = req.query.type;

    var errors = [];
    if (!type)
        errors.push({ status: 406, details: 'No type parameter provided' });
    else if (!(type.toLowerCase() === 'x' || type.toLowerCase() === 'y' || type.toLowerCase() == 'both'))
        errors.push({ status: 406, details: 'Type should be x or y or both' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }

    type = type.toLowerCase();
    
    const id = uuidv4();
    await canvasData.push('edit-image.mirror', {
        id,
        type,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/mirror/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.mirror');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await mirror(data[0].type, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;