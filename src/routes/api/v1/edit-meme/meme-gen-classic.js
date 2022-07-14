const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { memeGenClassic } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { top, bottom, image } = req.query;

    var errors = [];
    if (!top)
        errors.push({ status: 406, details: 'No top parameter provided' });
    else if (top.length > 50)
        errors.push({ status: 406, details: 'Top too long' });

    if (!bottom)
        errors.push({ status: 406, details: 'No bottom parameter provided' });
    else if (bottom.length > 50)
        errors.push({ status: 406, details: 'Bottom too long' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.memeGenClassic', {
        id,
        top,
        bottom,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/meme-gen-classic/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.memeGenClassic');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await memeGenClassic(data[0].top, data[0].bottom, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;