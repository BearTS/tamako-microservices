const router = require('express').Router();
const { validate } = require('uuid');
const { userTable } = require('../../database/main');
const { isEmpty } = require('lodash');

router.get('/:key_token?', async (req, res) => {
    try {
        if (req.params.key_token) {
            if (!validate(req.params.key_token))
                return res.status(400).json({
                    details: {
                        'path': req.baseUrl + req.path,
                        'content-type': req.headers['content-type'],
                        'user-agent': req.headers['user-agent']
                    },
                    error: true,
                    message: 'Thats an invalid token' // TODO: Add a better response than this.
                });
        
            if (isEmpty(await userTable.find('token', req.params.key_token)))
                return res.status(400).json({
                    details: {
                        'path': req.baseUrl + req.path,
                        'content-type': req.headers['content-type'],
                        'user-agent': req.headers['user-agent']
                    },
                    error: true,
                    message: 'Cannot find any user with that token.'
                });
            else
                return res.status(200).json(await userTable.find('token', req.params.key_token));     
        } else {
            res.status(200).json(await userTable.getMany(await userTable.keys));
        }
    } catch (err) {
        console.error(err.stack);
    }
});

module.exports = router;