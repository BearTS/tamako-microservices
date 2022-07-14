const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { speedLimit } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const limit = req.query.limit;
    
    if (!limit) 
        return errorResponse(req, res, 'No limit parameter provided', 406);
    if (isNaN(limit))
        return errorResponse(req, res, 'Limit must be a valid number', 406);
    else if (limit.length > 5) 
        return errorResponse(req, res, 'Limit must be less than 5 characters', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.speedLimit', {
        id,
        limit,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/speedLimit/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.speedLimit');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await speedLimit(data[0].limit);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;