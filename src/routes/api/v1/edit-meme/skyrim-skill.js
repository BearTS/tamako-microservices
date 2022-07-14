const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { SkyrimSkill } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { skill, image } = req.query;

    var errors = [];
    if (!skill)
        errors.push({ status: 406, details: 'No skill parameter provided' });
    else if (skill.length > 20)
        errors.push({ status: 406, details: 'Skill parameter provided should be less than 20 characters' });
    
    if (!image)
        errors.push({ status: 406, details: 'No image parameter provided' });
    
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.SkyrimSkill', {
        id,
        skill,
        image,
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/skyrim-skill/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.SkyrimSkill');
    const data = arr.filter(x => x.id === req.params.uuid);
    try {
        const buffer = await SkyrimSkill(data[0].skill, data[0].image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a Nike ad with this image.', 406);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;