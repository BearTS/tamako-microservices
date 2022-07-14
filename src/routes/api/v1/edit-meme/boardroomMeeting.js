const router = require('express').Router();
const { v4: uuidv4, validate } = require('uuid');
const { boardroomMeeting } = require('../../../../controllers/edit-meme');
const { canvasData } = require('../../../../database/main');
const { authorizeUser } = require('../../../../middleware/authorize');
const { errorResponse } = require('../../../../helper/ApiResponse');

router.get('/', authorizeUser, async (req, res) => {
    const { question, suggestion1, suggestion2, final} = req.query;

    var errors = [];
    if (!question)
        errors.push({ status: 406, details: 'No question parameter provided' });
    else if (question.length > 100)
        errors.push({ status: 406, details: 'Question too long' });
    if (!suggestion1)
        errors.push({ status: 406, details: 'No suggestion1 parameter provided' });
    else if (suggestion1.length > 50)
        errors.push({ status: 406, details: 'Suggestion1 too long' });

    if (!suggestion2)
        errors.push({ status: 406, details: 'No suggestion2 parameter provided' });
    else if (suggestion2.length > 50)
        errors.push({ status: 406, details: 'Suggestion2 too long' });
        
    if (!final)
        errors.push({ status: 406, details: 'No final parameter provided' });
    else if (final.length > 50)
        errors.push({ status: 406, details: 'Final too long' });
        
    if (errors.length !== 0) {
        let body = errors;
        errors = [];
        return errorResponse(req, res, body, 400);
    }
    
    const id = uuidv4();
    await canvasData.push('edit-meme.boardroomMeeting', {
        id,
        question,
        suggestion1,
        suggestion2,
        final
    });
    res.status(200).json({
        success: true,
        status: 200,
        link: `${req.protocol}://${req.get('host')}/api/v1/canvas/edit-meme/boardroomMeeting/${id}`
    });
});

router.get('/:uuid', async (req, res) => {
    if (!validate(req.params.uuid))
        return;
        
    const arr = await canvasData.get('edit-meme.boardroomMeeting');
    const data = arr.filter(x => x.id === req.params.uuid);

    try {
        const image = await boardroomMeeting(data[0].question, data[0].suggestion1, data[0].suggestion2, data[0].final);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(image);
    } catch (err) {
        errorResponse(req, res, err.message);
    }
});

module.exports = router;