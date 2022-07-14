const router = require('express').Router();
const { userTable } = require('../../database/main');
const userSchema = require('../../database/models/User');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
    const { ownerId, unlimited } = req.body;
    if (ownerId === null)
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Missing ownerId body parameter!'
        });
    if (unlimited === null)
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Missing unlimited body parameter!'
        });
        
    // Check if this user is already registered
    if (await userTable.has(ownerId))
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'User is already registered!'
        });
    
    const token = uuidv4();
    try {
        const userData = userSchema({ ownerId, token, creation_time: Date.now(), unlimited });
        userTable.ensure(ownerId, userData);
        res.status(200).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: false,
            data: userData
        });
    } catch (err) {
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: err.message
        });
    }
});

module.exports = router;