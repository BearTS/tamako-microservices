const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { bartChalkboard } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const text = req.query.text;

    if (!text) return errorResponse(req, res, 'No text parameter provided', 406);
    if (text.length > 280) return errorResponse(req, res, 'Text too long', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-meme.bartChalkboard', {
        id,
        text,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/bartChalkboard/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.bartChalkboard');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await bartChalkboard(data[0].text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;