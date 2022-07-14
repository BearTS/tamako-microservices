const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { challenger } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { image, silhouetted } = req.query;

    var errors = [];
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });

    if (!silhouetted)
        errors.push({ status: 406, details: 'No silhouetted parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.challenger', {
        id,
        image,
        silhouetted,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/challenger/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.challenger');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await challenger(data[0].image, data[0].silhouetted);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;