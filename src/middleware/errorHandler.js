const handleNotFound = (req, res) => {
    // Check if the baseUrl is api (serve json response if its api route)
    switch(String(req.originalUrl).split('/')[1]) {
    case 'api':
        res.status(404).json({
            details: {
                'path': req.baseUrl + req.path,
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent']
            },
            error: true,
            message: 'The requested URL was not found on this server. That\'s all we know.' // TODO: Add a better response
        });
        break;
    default:
        // res.status(404).sendFile(path.join(__dirname, '../../public/404.html'));
        res.status(404).render('404.html');
    }
};

const handleInternalError = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    let errorMessage;
    if (process.env.NODE_ENV === 'PRODUCTION') errorMessage = 'Something unexpected happend and we cant continue to proccess your request.';
    if (process.env.NODE_ENV === 'DEVELOPMENT') errorMessage = err.stack;

    res.status(err.statusCode).json({
        details: {
            'path': req.baseUrl + req.path,
            'content-type': req.headers['content-type'], 
            'user-agent': req.headers['user-agent']
        },
        error: true,
        message: errorMessage // TODO: Add a better response
    });
    next();
};

const handleRateLimit = (req, res, message = 'The rate limit is limited to 90 request per 1 minute') => {
    res.status(429).json({
        details: {
            'path': req.baseUrl + req.path,
            'content-type': req.headers['content-type'], 
            'user-agent': req.headers['user-agent']
        },
        error: true,
        message: message // TODO: Add a better response
    });
};

module.exports.handleNotFound = handleNotFound;
module.exports.handleRateLimit = handleRateLimit;
module.exports.handleInternalError = handleInternalError; 