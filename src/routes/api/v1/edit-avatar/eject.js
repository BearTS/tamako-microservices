const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { eject } = require('../../../../controllers/edit-avatar');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const avatarURL = req.query.avatarURL;
    const imposter = req.query.imposter || '';
    const username = req.query.username;
    const userID = req.query.userID;

    if (!username || isNaN(userID))
        return errorResponse(req, res, 'Username not provided or userID', 406);

    const id = uuidv4();
    await canvasData.push('edit-avatar.eject', {
        id,
        avatarURL,
        imposter,
        username,
        userID
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-avatar/eject/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-avatar.eject');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await eject(data[0].avatarURL, data[0].imposter, data[0].username, data[0].userID);
        if (image === 0) return errorResponse(req, res, 'Invalid Image URL');
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;