const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { beLikeBill } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const name = req.query.name || 'Bill';

    if (!name) return errorResponse(req, res, 'No name parameter provided', 406);
    if (name.length > 280) return errorResponse(req, res, 'Name is too long', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-meme.beLikeBill', {
        id,
        name,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/beLikeBill/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.beLikeBill');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await beLikeBill(data[0].name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;