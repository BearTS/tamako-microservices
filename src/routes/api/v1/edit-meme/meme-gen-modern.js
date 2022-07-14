const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { memeGenModern } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { text, image } = req.query;

    var errors = [];
    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
    else if (text.length > 50)
        errors.push({ status: 406, details: 'Text too long' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.memeGenModern', {
        id,
        text,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/meme-gen-modern/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.memeGenModern');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await memeGenModern(data[0].text, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;