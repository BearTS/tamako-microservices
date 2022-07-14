const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { color } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const input = req.query.input;

    if (!input) return errorResponse(req, res, 'No input parameter provided, #colorcode or name', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.color', {
        id,
        input,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/color/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.color');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await color(data[0].input);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;