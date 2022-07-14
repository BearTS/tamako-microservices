const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { pogchamp } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const amount = req.query.amount;

    if (!amount) return errorResponse(req, res, 'No amount parameter provided', 406);
    if (isNaN(amount)) return errorResponse(req, res, 'Amount value should be a valid number', 406);
    if (amount.length > 280) return errorResponse(req, res, 'Amount too long', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-meme.pogchamp', {
        id,
        amount,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/pogchamp/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.pogchamp');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await pogchamp(data[0].amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;