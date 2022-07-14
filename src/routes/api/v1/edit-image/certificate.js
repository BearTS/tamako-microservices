const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { certificate } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { reason, name } = req.query;

    var errors = [];
    if (!reason)
        errors.push({ status: 406, details: 'No reason parameter provided' });
    else if (reason.length > 30)
        errors.push({ status: 406, details: 'Provide reason between 1 and 180' });

    if (!name)
        errors.push({ status: 406, details: 'No name parameter provided' });
    else if (name.length > 30)
        errors.push({ status: 406, details: 'Name length should be between 1 and 180' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.certificate', {
        id,
        reason,
        name,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/certificate/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.certificate');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await certificate(data[0].reason, data[0].name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;