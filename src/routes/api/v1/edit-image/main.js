const router = require('express').Router();

router.use('/achievement', require('./achievement'));
router.use('/approve', require('./approve'));
router.use('/axis-cult', require('./axis-cult'));
router.use('/blur', require('./blur'));
router.use('/bobross', require('./bobross'));
router.use('/brazzers', require('./brazzers'));
router.use('/charcoal', require('./charcoal')); // broken: Error: Stream yields empty buffer
router.use('/caution', require('./caution'));
router.use('/certificate', require('./certificate'));
router.use('/chineserestaurant', require('./chineserestaurant'));
router.use('/circle', require('./circle'));
router.use('/color', require('./color'));
router.use('/communist', require('./communist'));
router.use('/contrast', require('./contrast'));
router.use('/createqr', require('./createqr'));
router.use('/customtext', require('./customtext'));
router.use('/danger', require('./danger'));
router.use('/devito', require('./devito')); // Starting here no test

router.use('/desaturate', require('./desaturate'));
router.use('/dexter', require('./dexter'));
router.use('/distort', require('./distort'));
router.use('/emboss', require('./emboss'));
router.use('/eyes', require('./eyes'));
router.use('/fireframe', require('./fireframe'));
router.use('/fisheye', require('./fisheye'));
router.use('/gandhiquote', require('./gandhiquote'));
router.use('/ghost', require('./ghost'));
router.use('/glass-shatter', require('./glass-shatter'));
router.use('/glitch', require('./glitch'));
router.use('/greyscale', require('./greyscale'));
router.use('/gun', require('./gun'));
router.use('/hands', require('./hands'));
router.use('/highwaysign', require('./highwaysign'));
router.use('/hollywoodstar', require('./hollywoodstar'));
router.use('/ifunny', require('./ifunny'));
router.use('/invert', require('./invert'));
router.use('/jeopardyQuestion', require('./jeopardyQuestion'));
router.use('/legoIcon', require('./legoIcon'));
router.use('/liquidRescale', require('./liquidRescale'));
router.use('/licensePlate', require('./licensePlate'));
router.use('/mirror', require('./mirror'));
router.use('/motionBlur', require('./motionBlur'));
router.use('/newspaper', require('./newspaper'));
router.use('/noise', require('./noise')); // broken: Error: Stream yields empty buffer
router.use('/pet', require('./pet'));
router.use('/pixelize', require('./pixelize'));
router.use('/policeTape', require('./policeTape'));
router.use('/rainbow', require('./rainbow'));
router.use('/rejected', require('./rejected'));
router.use('/rotate', require('./rotate'));
router.use('/silouette', require('./silouette')); // Its pure black
router.use('/simp', require('./simp'));
router.use('/speedLimit', require('./speedLimit'));
router.use('/spongebobTimeCard', require('./spongebobTimeCard'));
router.use('/oilPainting', require('./oilPainting')); // broken: Error: Stream yields empty buffer
router.use('/tint', require('./tint'));
router.use('/squish', require('./squish')); // broken: Error: Stream yields empty buffer
router.use('/swirl', require('./swirl')); // broken: Error: Stream yields empty buffer
router.use('/undertale', require('./undertale'));
router.use('/wanted', require('./wanted'));
router.use('/wildPokemon', require('./wildPokemon'));
router.use('/youDied', require('./youDied'));

module.exports = router;