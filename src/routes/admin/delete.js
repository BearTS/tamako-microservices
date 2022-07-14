const router = require('express').Router();
const { isEmpty } = require('lodash');
const { userTable } = require('../../database/main');

router.delete('/:key_token?', async (req, res) => {
    // Check if theres a key_token parameter
    if (!req.params.key_token)
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Token parameter is required' // TODO: Add a better response than this.
        });

    // Check if key is in the db -> return 400 if no
    if (isEmpty(await userTable.find('token', req.params.key_token)))
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Cannot find any user with that token.' // TODO: Add a better response than this.
        });
    
    try {
        const filteredUser = Object.values(await userTable.find('token', req.params.key_token))[0];

        await userTable.delete(filteredUser.ownerId); // Delete the user from the database
        res.status(200).json({
            details: {
                'path': req.baseUrl + req.path, 
                'content-type': req.headers['content-type'], 
                'user-agent': req.headers['user-agent'] 
            },
            error: false,
            data: 'Successfully delete user: ' + filteredUser.ownerId
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