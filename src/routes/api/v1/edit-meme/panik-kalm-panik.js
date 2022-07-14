const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { PanikKalmPanik } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { panik, kalm, panik2 } = req.query;

    var errors = [];
    if (!panik)
        errors.push({ status: 406, details: 'No panik parameter provided' });
    else if (panik.length > 150)
        errors.push({ status: 406, details: 'Panik too long' });

    if (!kalm)
        errors.push({ status: 406, details: 'No kalm parameter provided' });
    else if (kalm.length > 150)
        errors.push({ status: 406, details: 'Kalm too long' });
    
    if (!panik2)
        errors.push({ status: 406, details: 'No panik2 parameter provided' });
    else if (panik2.length > 150)
        errors.push({ status: 406, details: 'Panik2 too long' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.PanikKalmPanik', {
        id,
        panik,
        kalm,
        panik2,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/panik-kalm-panik/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.PanikKalmPanik');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await PanikKalmPanik(data[0].panik, data[0].kalm, data[0].panik2);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;