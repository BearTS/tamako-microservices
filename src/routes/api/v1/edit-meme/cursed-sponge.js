const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { cursedSponge } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return errorResponse(req, res, 'No amount parameter provided', 406);
    if (amount > 100) return errorResponse(req, res, 'Amount too high', 406);
    if (amount < 1) return errorResponse(req, res, 'Amount too low', 406);
    
    const id = uuidv4();
    canvasData.push('edit-meme.cursedSponge', {
        id,
        amount,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/cursed-sponge/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.cursedSponge');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await cursedSponge(data[0].amount);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;