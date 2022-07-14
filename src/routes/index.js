const router = require('express').Router();
const { mainRateLimiter } = require('../middleware/rateLimiter');

// Main route
router.get('/', mainRateLimiter, async (req, res) => {
    res.status(200).render('index.html');
});

// API routes
router.use('/api', require('./api/index'));

// Admin route
router.use('/admin', require('./admin/main'));

module.exports = router;