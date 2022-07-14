const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { wildPokemon } = require('../../../../controllers/edit-image');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { name, image } = req.query;

    var errors = [];
    if (!name)
        errors.push({ status: 406, details: 'No name parameter provided' });
    else if (name.length > 13)
        errors.push({ status: 406, details: 'Name should be less than 13 characters' });

    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-image.wildPokemon', {
        id,
        name,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-image/wildPokemon/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-image.wildPokemon');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const buffer = await wildPokemon(data[0].name, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid Image URL'); 
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;