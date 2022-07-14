const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { hollywoodstar } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const name = req.query.name;

    if (!name) 
        return errorResponse(req, res, 'No name parameter provided', 406);
    if (name.length > 30) 
        return errorResponse(req, res, 'Name must be less than 30 characters', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-image.hollywoodstar', {
        id,
        name,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/hollywoodstar/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.hollywoodstar');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await hollywoodstar(data[0].name);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;