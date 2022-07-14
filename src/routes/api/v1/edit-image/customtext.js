const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { customtext } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { text, image } = req.query;

    var errors = [];
    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
    else if (text < 1 || text > 180)
        errors.push({ status: 406, details: 'Provide text between 1 and 180' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.customtext', {
        id,
        text,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/customtext/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.customtext');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await customtext(data[0].image, data[0].text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;