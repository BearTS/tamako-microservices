const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { alert } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const message = req.query.message;

    if (!message) return errorResponse(req, res, 'No message parameter provided', 406);
    if (message.length > 280) return errorResponse(req, res, 'Message too long', 406);
    
    const id = uuidv4();
    canvasData.push('edit-meme.alert', {
        id,
        message,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/alert/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.alert');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await alert(data[0].message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;