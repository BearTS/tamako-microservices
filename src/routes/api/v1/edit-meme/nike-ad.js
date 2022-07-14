const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { nikeAd } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { something, sacrifice, image } = req.query;

    var errors = [];
    if (!something)
        errors.push({ status: 406, details: 'No something parameter provided' });
    else if (something.length > 50)
        errors.push({ status: 406, details: 'Something too long' });

    if (!sacrifice)
        errors.push({ status: 406, details: 'No sacrifice parameter provided' });
    else if (sacrifice.length > 50)
        errors.push({ status: 406, details: 'Sacrifice too long' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.nikeAd', {
        id,
        something,
        sacrifice,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/nike-ad/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.nikeAd');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await nikeAd(data[0].image, data[0].something, data[0].sacrifice);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a Nike ad with this image.', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;