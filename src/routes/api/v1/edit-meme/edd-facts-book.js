const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { EddFactBook } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const fact = req.query.fact;

    if (!fact) return errorResponse(req, res, 'No fact parameter provided', 406);
    if (fact.length > 280) return errorResponse(req, res, 'Fact too long', 406);
    
    const id = uuidv4();
    await canvasData.push('edit-meme.EddFactBook', {
        id,
        fact,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/edd-facts-book/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.EddFactBook');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await EddFactBook(data[0].fact);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;