const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { demotivational } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { title, image, text } = req.query;

    var errors = [];
    if (!title)
        errors.push({ status: 406, details: 'No title parameter provided' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (!text)
        errors.push({ status: 406, details: 'No text parameter provided' });
    else if (text.length > 100 || title.length > 50)
        errors.push({ status: 406, details: 'Text too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.demotivational', {
        id,
        title,
        text,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/demotivational/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.demotivational');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await demotivational(data[0].title, data[0].text, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;