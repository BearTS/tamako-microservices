const { RateLimiterMemory } = require('rate-limiter-flexible');
const { getClientIp } = require('request-ip');
const moment = require('moment');
const { handleRateLimit } = require('./errorHandler');
// eslint-disable-next-line no-unused-vars
const { userTable } = require('../database/main');

// Rate limiter options
const mainLimiter = new RateLimiterMemory({
    points: 120, // 90 requests
    duration: 60, // per 60 second by IP,
    blockDuration: 60 * 15 // Block for 15 minutes after reaching the limit
});

const mainRateLimiter = async (req, res, next) => {
    if (req.path.indexOf('/api/v1') === 0) {
        mainLimiter.consume(getClientIp(req))
            .then((rateLimiterRes) => {
                res.set({
                    'X-RateLimit-Limit': mainLimiter.points,
                    'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                    'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
                });
                next();
            })
            .catch((rateLimiterRes) => {
                res.set('Retry-After', moment.utc((rateLimiterRes.msBeforeNext / 1000) * 1000).format('mm:ss')); 
                res.set({
                    'X-RateLimit-Limit': mainLimiter.points,
                    'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                    'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
                });
                handleRateLimit(req, res); // Send an rate limited message
            });
    } else {
        mainLimiter.consume(getClientIp(req))
            .then((rateLimiterRes) => {
                res.set({
                    'X-RateLimit-Limit': mainLimiter.points,
                    'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                    'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
                });
                next();
            })
            .catch((rateLimiterRes) => {
                res.set('Retry-After', moment.utc((rateLimiterRes.msBeforeNext / 1000) * 1000).format('mm:ss')); 
                res.set({
                    'X-RateLimit-Limit': mainLimiter.points,
                    'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                    'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext)
                });
                handleRateLimit(req, res); // Send an rate limited message
            });
    }
};

module.exports = {
    mainRateLimiter
};