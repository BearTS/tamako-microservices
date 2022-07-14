const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { drakePosting } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { yeah, nah } = req.query;

    var errors = [];
    if (!yeah)
        errors.push({ status: 406, details: 'No yeah parameter provided' });

    if (!nah)
        errors.push({ status: 406, details: 'No nah parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.drakePosting', {
        id,
        yeah,
        nah,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/drakePosting/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.drakePosting');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await drakePosting(data[0].nah, data[0].yeah);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;