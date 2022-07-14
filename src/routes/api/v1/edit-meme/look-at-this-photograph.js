const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { LookAtThisPhotograph } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const image = req.query.image;

    if (!image) return errorResponse(req, res, 'No image parameter provided');
    
    const id = uuidv4();
    await canvasData.push('edit-meme.LookAtThisPhotograph', {
        id,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/look-at-this-photograph/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.LookAtThisPhotograph');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await LookAtThisPhotograph(data[0].image);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        console.log(err);
        errorResponse(req, res, err.message);
    }
});

module.exports = router;