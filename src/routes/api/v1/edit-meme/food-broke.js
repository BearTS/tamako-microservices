const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { FoodBroke } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;

    if (!avatarURL) return errorResponse(req, res, 'No avatarURL parameter provided');
    
    const id = uuidv4();
    await canvasData.push('edit-meme.FoodBroke', {
        id,
        avatarURL,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/food-broke/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.FoodBroke');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await FoodBroke(data[0].avatarURL);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;