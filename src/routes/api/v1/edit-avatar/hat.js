const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { hat } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const type = req.query.type;
    const addX = req.query.addX || 0;
    const addY = req.query.addY || 0;
    const scale = req.query.scale || 0;
    const hats = new Set(['anon','ash','becel','birthday','christmas','devil','disguise','dunce','leprechaun','mask','megumin','pilgrim','pirate','soviet','tophat','witch']);
    
    if (!addX || !addY || !scale || !type || scale > 1000 || scale < 0) 
        return errorResponse(req, res, 'Invalid parameters', 406);
    if (!hats.has(type)) 
        return errorResponse(req, res, 'Invalid hat type', 406);

    const id = uuidv4();
    await canvasData.push('edit-avatar.hat', {
        id,
        avatarURL,
    });

    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/hat/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-avatar.hat');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await hat(data[0].avatarURL, data[0].type, data[0].addX, data[0].addY, data[0].scale);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;