const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { PhoebeTeachingJoey } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { correct, incorrect } = req.query;

    var errors = [];
    if (!correct)
        errors.push({ status: 406, details: 'No correct parameter provided' });
    else if (correct.length > 150)
        errors.push({ status: 406, details: 'Correct too long' });

    if (!incorrect)
        errors.push({ status: 406, details: 'No incorrect parameter provided' });
    else if (incorrect.length > 150)
        errors.push({ status: 406, details: 'Incorrect too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.PhoebeTeachingJoey', {
        id,
        correct,
        incorrect,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/phoebe-teaching-joey/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.PhoebeTeachingJoey');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await PhoebeTeachingJoey(data[0].correct, data[0].incorrect);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;