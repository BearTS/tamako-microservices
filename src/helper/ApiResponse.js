const errorResponse = (req, res, message, code = 400) => {
    res.status(code).json({
        details: {
            'path': req.baseUrl + req.path,
            'content-type': req.headers['content-type'], 
            'user-agent': req.headers['user-agent']
        },
        error: true,
        message: message // Expect an error object or array if multiple
    });
};


module.exports = {
    errorResponse
};