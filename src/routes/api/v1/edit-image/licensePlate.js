const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { licensePlate } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const text = req.query.text;

    if (!text) 
        return errorResponse(req, res, 'No text parameter provided', 406);
    if (text.length > 10) 
        return errorResponse(req, res, 'Text must be less than 10 characters', 406);
    
    const id = uuidv4();
    canvasData.push('canvasData', {
        id,
        text,
    }, 'edit-image.licensePlate');
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/licensePlate/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = canvasData.get('canvasData', 'edit-image.licensePlate');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await licensePlate(data[0].text);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;