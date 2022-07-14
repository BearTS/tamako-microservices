// eslint-disable-next-line no-unused-vars
const { userTable } = require('../database/main');
require('dotenv').config();

const authorizeUser = async (req, res, next) => {
    // Get Authorization header value -> should be valid
    if (!req.get('Authorization')) {
        return res.status(405).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Dont have a token? Visit the discord server ' + process.env.DISCORD_INVITE // TODO: Add discord support server invite link
        });
    }

    const indexes = await userTable.keys;
    const array = [];
    indexes.forEach(async val => {
        if (indexes.length !== array.length)
            array.push(await userTable.get(val));
    });

    // Check if the auth header value is in the database
    if (array.filter(x => x.token === req.get('Authorization')).length !== 0 || req.get('Authorization') === process.env.EXTERNAL_TOKEN) {
        next();
    } else {
        return res.status(400).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'Invalid Key, go to our discord server to get one ' + process.env.DISCORD_INVITE // TODO: Add a better response than this.
        });
    }
    
};

const authorizeAdmin = (req, res, next) => {
    // Get Authorization header value -> should be valid
    try {
        if (!req.get('Authorization'))
            return res.status(405).json({
                details: {
                    'path': req.baseUrl + req.path,
                    'content-type': req.headers['content-type'],
                    'user-agent': req.headers['user-agent']
                },
                error: true,
                message: 'Dont have a token? Visit the discord server ' + process.env.DISCORD_INVITE // TODO: Add discord support server invite link
            });

        if (req.get('Authorization') === process.env.EXTERNAL_TOKEN) {
            next();
        } else {
            res.status(405).json({
                details: {
                    'path': req.baseUrl + req.path,
                    'content-type': req.headers['content-type'],
                    'user-agent': req.headers['user-agent']
                },
                error: true,
                message: 'Your not allowed to access this endpoint' // TODO: Add discord support server invite link
            });
        }
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports.authorizeUser = authorizeUser;
module.exports.authorizeAdmin = authorizeAdmin;