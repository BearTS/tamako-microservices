const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { UltimateTattoo } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const image = req.query.image;

    if (!image) return errorResponse(req, res, 'No image parameter provided');
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        image,
    }, 'edit-meme.UltimateTattoo');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/ultimate-tattoo/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-meme.UltimateTattoo');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await UltimateTattoo(data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        console.log(err);
        errorResponse(req, res, err.message);
    }
});

module.exports = router;