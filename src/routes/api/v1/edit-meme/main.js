const router = require('express').Router();

router.use('/3000years', require('./3000years'));
router.use('/alert', require('./alert'));
router.use('/bartChalkboard', require('./bartChalkboard'));
router.use('/beautiful', require('./beautiful'));
router.use('/beLikeBill', require('./beLikeBill'));
router.use('/boardroomMeeting', require('./boardroomMeeting'));
router.use('/challenger', require('./challenger'));
router.use('/change-my-mind', require('./change-my-mind'));
router.use('/chi-idea', require('./chi-idea'));
router.use('/crush', require('./crush'));
router.use('/cursed-sponge', require('./cursed-sponge'));
router.use('/deep-fry', require('./deep-fry'));
router.use('/demotivational', require('./demotivational')); // broke
router.use('/distracted-boyfriend', require('./distracted-boyfriend'));
router.use('/drakePosting', require('./drakePosting')); // broke
router.use('/edd-facts-book', require('./edd-facts-book'));
router.use('/enslaved', require('./enslaved')); // broke
router.use('/food-broke', require('./food-broke'));
router.use('/for-five-hours', require('./for-five-hours'));
router.use('/genie-rules', require('./genie-rules')); // mising genie-rules.png image
router.use('/girl-worth-fighting-for', require('./girl-worth-fighting-for'));
router.use('/gru-plan', require('./gru-plan'));
router.use('/i-fear-no-man', require('./i-fear-no-man'));
router.use('/if-those-kids-could-read', require('./if-those-kids-could-read')); // broke
router.use('/kyonGun', require('./kyonGun'));
router.use('/like', require('./like'));
router.use('/lisa-presentation', require('./lisa-presentation'));
router.use('/look-at-this-photograph', require('./look-at-this-photograph')); // maybe add subtitle
router.use('/mario-bros-view', require('./mario-bros-view'));
router.use('/meme-gen-classic', require('./meme-gen-classic')); // font warning
router.use('/meme-gen-modern', require('./meme-gen-modern'));
router.use('/metamorphosis', require('./metamorphosis'));
router.use('/my-collection-grows', require('./my-collection-grows'));
router.use('/new-password', require('./new-password')); // wrong display of text in image
router.use('/nike-ad', require('./nike-ad'));
router.use('/panik-kalm-panik', require('./panik-kalm-panik'));
router.use('/phoebe-teaching-joey', require('./phoebe-teaching-joey'));
router.use('/pills', require('./pills')); // broke
router.use('/plankton-plan', require('./plankton-plan'));
router.use('/pogchamp', require('./pogchamp'));
router.use('/scroll-of-truth', require('./scroll-of-truth'));
router.use('/skyrim-skill', require('./skyrim-skill'));
router.use('/sonic-says', require('./sonic-says'));
router.use('/soraSelfies', require('./soraSelfies'));
router.use('/sos', require('./sos'));
router.use('/spiderman-pointing', require('./spiderman-pointing'));
router.use('/spongebob-burn', require('./spongebob-burn')); // broke
router.use('/that-sign-wont-stop-me', require('./that-sign-wont-stop-me'));
router.use('/this-guy', require('./this-guy'));
router.use('/to-be-continued', require('./to-be-continued'));
router.use('/tuxedo-pooh', require('./tuxedo-pooh'));
router.use('/two-buttons', require('./two-buttons'));
router.use('/ultimate-tattoo', require('./ultimate-tattoo'));
router.use('/vietnam-flashbacks', require('./vietnam-flashbacks'));
router.use('/worse-than-hitler', require('./worse-than-hitler'));
router.use('/worthless', require('./worthless'));

module.exports = router;