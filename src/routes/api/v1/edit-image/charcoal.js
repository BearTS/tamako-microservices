const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { charcoal } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const image = req.query.image;

    if (!image) return errorResponse(req, res, 'No image parameter provided', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.charcoal', {
        id,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/charcoal/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.charcoal');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await charcoal(data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        console.log(err.stack);
        errorResponse(req, res, err.message);
    }
});

module.exports = router;