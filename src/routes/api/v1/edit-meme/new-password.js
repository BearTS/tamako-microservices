const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { newPassword } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { weak, strong } = req.query;

    var errors = [];
    if (!weak)
        errors.push({ status: 406, details: 'No weak parameter provided' });
    else if (weak.length > 50)
        errors.push({ status: 406, details: 'Weak too long' });

    if (!strong)
        errors.push({ status: 406, details: 'No strong parameter provided' });
    else if (strong.length > 50)
        errors.push({ status: 406, details: 'Strong too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.newPassword', {
        id,
        weak,
        strong,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/new-password/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.newPassword');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await newPassword(data[0].weak, data[0].strong);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;