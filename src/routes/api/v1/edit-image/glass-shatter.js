const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { glassshatter } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const quote = req.query.quote;

    if (!quote) 
        return errorResponse(req, res, 'No quote parameter provided', 406);
    if (quote.length > 500) 
        return errorResponse(req, res, 'Quote must be less than 500 characters', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.glassshatter', {
        id,
        quote,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/glass-shatter/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.glassshatter');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await glassshatter(data[0].quote);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;