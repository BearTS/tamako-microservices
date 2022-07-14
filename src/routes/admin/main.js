const router = require('express').Router();
const { authorizeAdmin } = require('../../middleware/authorize');

router.use(authorizeAdmin);
router.use('/view', require('./view'));
router.use('/createkey', require('./createkey'));
router.use('/delete', require('./delete'));
router.use('/unlimited', require('./unlimited'));

// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res) => {
    res.status(200).send('Whatcha doin here?');
});

module.exports = router;