const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { MarioBrosViews } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { thing, mario, luigi } = req.query;

    var errors = [];
    if (!thing)
        errors.push({ status: 406, details: 'No thing parameter provided' });
    else if (thing.length > 20)
        errors.push({ status: 406, details: 'Thing too long' });

    if (!mario)
        errors.push({ status: 406, details: 'No mario parameter provided' });
    else if (mario.length > 280)
        errors.push({ status: 406, details: 'Mario too long' });
    
    if (!luigi)
        errors.push({ status: 406, details: 'No luigi parameter provided' });
    else if (luigi.length > 280)
        errors.push({ status: 406, details: 'Luigi too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.MarioBrosViews', {
        id,
        thing,
        mario,
        luigi,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/mario-bros-view/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.MarioBrosViews');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await MarioBrosViews(data[0].thing, data[0].mario, data[0].luigi);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;