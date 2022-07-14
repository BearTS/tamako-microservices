const router = require('express').Router();

router.use('/avatarFusion', require('./avatarFusion'));
router.use('/eject', require('./eject'));
router.use('/fire', require('./fire'));
router.use('/hearts', require('./hearts'));
router.use('/heLivesInYou', require('./heLivesInYou'));
router.use('/iHaveThePower', require('./iHaveThePower'));
router.use('/milk', require('./milk'));
router.use('/rip', require('./rip'));
router.use('/sip', require('./sip'));
router.use('/steamNowPlaying', require('./steamNowPlaying'));
router.use('/steamNowPlayingClassic', require('./steamNowPlayingClassic'));
router.use('/triggered', require('./triggered'));


module.exports = router;