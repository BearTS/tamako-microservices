const router = require('express').Router();

const {
    threekyears,
    alert,
    bartChalkboard,
    beLikeBill,
    beautiful,
    boardroomMeeting,
    challenger,
    changeMyMind,
    chiIdea,
    crush,
    cursedSponge,
    deepFry,
    demotivational,
    distractedBF,
    drakePosting,
    EddFactBook,
    enslaved,
    FoodBroke,
    ForFiveHours,
    genieRules,
    girlWorthFightingFor,
    gruPlan,
    iFearNoMan,
    ifThoseKidsCouldRead,
    kyonGun,
    like,
    LisaPresentation,
    LookAtThisPhotograph,
    MarioBrosViews,
    memeGenClassic,
    memeGenModern,
    metamorphosis,
    MyCollectionGrows,
    newPassword,
    nikeAd,
    PanikKalmPanik,
    PhoebeTeachingJoey,
    pills,
    PlanktonPlan,
    pogchamp,
    ScrollOfTruth,
    SkyrimSkill,
    SonicSays,
    soraSelfie,
    sos,
    SpidermanPointing,
    SpongebobBurn,
    ThatSignWontStopMe,
    ThisGuy,
    ToBeContinued,
    TuxedoPooh,
    TwoButtons,
    UltimateTattoo,
    VietnamFlashbacks,
    WorseThanHitler,
    worthless,

} = require('../Functions/edit-meme');

router.get('/3000years', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await threekyears(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/alert', async (req, res) => {
    const message = req.query.message;
    if (!message) return res.status(406).send(JSON.stringify({ error: 'Invalid message' }));
    if (message.length > 280) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await alert(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/bartChalkboard', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 50) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await bartChalkboard(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/beLikeBill', async (req, res) => {
    const name = req.query.name || 'Bill';
    if (!name) return res.status(406).send(JSON.stringify({ error: 'Name is required' }));
    if (name.length > 50) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await beLikeBill(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/beautiful', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await beautiful(avatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/boardroomMeeting', async (req, res) => {
    const { question, suggestion1, suggestion2, final} = req.query;
    if (!question || !suggestion1 || !suggestion2 || !final) return res.status(406).send(JSON.stringify({ error: 'Missing parameters' }));
    if (question.length > 100 || suggestion1.length > 50 || suggestion2.length > 50 || final.length > 50) return res.status(406).send(JSON.stringify({ error: 'Strings too long' }));
    try {
        const buffer = await boardroomMeeting(question, suggestion1, suggestion2, final);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/challenger', async (req, res) => {
    const { image, silhouetted } = req.query;
    if (!image || !silhouetted) return res.status(406).send(JSON.stringify({ error: 'Invalid Parameters' }));
    try {
        const buffer = await challenger(image, silhouetted);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/change-my-mind', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await changeMyMind(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/chi-idea', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 100) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await chiIdea(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/crush', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await crush(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/cursed-sponge', async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return res.status(406).send(JSON.stringify({ error: 'No amount provided' }));
    if (amount > 100) return res.status(406).send(JSON.stringify({ error: 'Amount too high' }));
    if (amount < 1) return res.status(406).send(JSON.stringify({ error: 'Amount too low' }));
    try {
        const buffer = await cursedSponge(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/deep-fry', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    try {
        const buffer = await deepFry(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/demotivational', async (req, res) => {
    const { title, image, text } = req.query;
    if (!title) return res.status(406).send(JSON.stringify({ error: 'Title required' }));
    if (!text) return res.status(406).send(JSON.stringify({ error: 'Text required' }));
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    if (text.length > 100 || title.length > 50) return res.status(406).send(JSON.stringify({ error: 'Text or title too long' }));
    try {
        const buffer = await demotivational(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/distracted-boyfriend', async (req, res) => {
    const { otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL } = req.query;
    if (!otherGirlAvatarURL || !boyfriendAvatarURL|| !girlfriendAvatarURL) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    try {
        const buffer = await distractedBF(otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/drakePosting', async (req, res) => {
    const { yeah, nah } = req.query;
    if (!yeah || !nah) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    if (yeah.length > 500 || nah.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await drakePosting(nah, yeah);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/edd-facts-book', async (req, res) => {
    const fact = req.query.fact;
    if (!fact) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (fact.length > 500) return res.status(406).send(JSON.stringify({ error: 'Message too long' }));
    try {
        const buffer = await EddFactBook(fact);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/enslaved', async (req, res) => {
    const { image, name } = req.query;
    if (!image) return res.status(406).send(JSON.stringify({ error: 'Image required' }));
    if (!name) return res.status(406).send(JSON.stringify({ error: 'No Name provided' }));
    if (name.length > 20) return res.status(406).send(JSON.stringify({ error: 'Name too long' }));
    try {
        const buffer = await enslaved(name, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/food-broke', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return res.status(406).send(JSON.stringify({ error: 'Avatar URL required' }));
    try {
        const buffer = await FoodBroke(avatarURL);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/for-five-hours', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await ForFiveHours(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/genie-rules', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await genieRules(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/girl-worth-fighting-for', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await girlWorthFightingFor(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/gru-plan', async (req, res) => {
    const { step1, step2, step3 } = req.query;
    if (!step1 || !step2 || !step3) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    if (step1.length > 150 || step2.length > 150 || step3.length > 150) return res.status(406).send(JSON.stringify({ error: 'Parameters provided should be less than 150 characters' }));
    try {
        const buffer = await gruPlan(step1, step2, step3);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/i-fear-no-man', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await iFearNoMan(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/if-those-kids-could-read', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await ifThoseKidsCouldRead(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/kyonGun', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await kyonGun(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/like', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await like(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/lisa-presentation', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await LisaPresentation(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/look-at-this-photograph', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await LookAtThisPhotograph(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/mario-bros-view', async (req, res) => {
    const {thing, mario, luigi}= req.query;
    if (!thing, !mario, !luigi) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    if (thing.length > 20 || mario.length > 280 || luigi.length > 280) return res.status(406).send(JSON.stringify({ error: 'too long' }));
    try {
        const buffer = await MarioBrosViews(thing, mario, luigi);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/meme-gen-classic', async (req, res) => {
    const { top, bottom, image }= req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    if (!top || !bottom) return res.status(400).json({ message: 'Please provide a top and bottom text' });
    if (top.length > 50 || bottom.length > 50) return res.status(406).send(JSON.stringify({ error: 'Parameters provided should be less than 50 characters' }));
    try {
        const buffer = await memeGenClassic(top, bottom, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 406) return res.status(406).send(JSON.stringify({ error: 'There\'s not enough width to make a meme with this image.'}));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/meme-gen-modern', async (req, res) => {
    const { text, image }= req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    if (!text ) return res.status(400).json({ message: 'Missing Parameters' });
    try {
        const buffer = await memeGenModern(text, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/metamorphosis', async (req, res) => {
    const { name, image }= req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    if (!name ) return res.status(400).json({ message: 'Missing Parameters' });
    if (name.length > 280) return res.status(406).send(JSON.stringify({ error: 'Name too long' }));
    try {
        const buffer = await metamorphosis(name, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/my-collection-grows', async (req, res) => {
    const image = req.query.image;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await MyCollectionGrows(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/new-password', async (req, res) => {
    const {weak, strong}= req.query;
    if (!weak, !strong) return res.status(406).send(JSON.stringify({ error: 'Missing Parameters' }));
    if (weak.length > 50 || strong.length > 50) return res.status(406).send(JSON.stringify({ error: 'too long' }));
    try {
        const buffer = await newPassword(weak, strong);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/nike-ad', async (req, res) => {
    const { something, sacrifice, image }= req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    if (!something || !sacrifice) return res.status(400).json({ message: 'Missing Parameters' });
    if (something.length > 50 || sacrifice.length > 50) return res.status(406).send(JSON.stringify({ error: 'Parameters provided should be less than 50 characters' }));
    try {
        const buffer = await nikeAd(image, something, sacrifice);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        if (buffer === 406) return res.status(406).send(JSON.stringify({ error: 'There\'s not enough width to make a Nike ad with this image.'}));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/panik-kalm-panik', async (req, res) => {
    const {panik, kalm, panik2} = req.query;
    if (!panik || !kalm || !panik2) return res.status(400).json({ message: 'Missing Parameters' });
    if (panik.length > 500 || kalm.length > 500 || panik2.length > 500) return res.status(406).send(JSON.stringify({ error: 'Parameters provided should be less than 500 characters' }));
    try {
        const buffer = await PanikKalmPanik(panik, kalm, panik2);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/phoebe-teaching-joey', async (req, res) => {
    const { correct, incorrect } = req.query;
    if (!correct || !incorrect) return res.status(400).json({ message: 'Missing Parameters' });
    if (correct.split(' ') < 3) return res.status(406).send(JSON.stringify({ error: 'Correct answer should be at least 3 words' }));
    if (correct.length > 50) return res.status(406).send(JSON.stringify({ error: 'Correct answer should be less than 50 characters' }));   
    try {
        const buffer = await PhoebeTeachingJoey(correct, incorrect);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});


router.get('/pills', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(406).send(JSON.stringify({ error: 'No text provided' }));
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await pills(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/plankton-plan', async (req, res) => {
    const { step1, step2, step3 } = req.query;
    if (!step1 || !step2 || !step3) return res.status(400).json({ message: 'Missing Parameters' });
    if (step1.length > 150 || step2.length > 150 || step3.length > 150) return res.status(406).send(JSON.stringify({ error: 'Parameters provided should be less than 150 characters' }));
    try {
        const buffer = await PlanktonPlan(step1, step2, step3);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/pogchamp', async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return res.status(400).json({ message: 'Please provide an amount' });
    if (amount.length > 100) return res.status(406).send(JSON.stringify({ error: 'Amount too long' }));
    try {
        const buffer = await pogchamp(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/scroll-of-truth', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ message: 'Please provide text' });
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await ScrollOfTruth(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/skyrim-skill', async (req, res) => {
    const { skill, image }= req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    if (!skill) return res.status(400).json({ message: 'Please provide a skill' });
    if (skill.length > 20) return res.status(406).send(JSON.stringify({ error: 'Skill provided should be less than 20 characters' }));
    try {
        const buffer = await SkyrimSkill(skill, image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/sonic-says', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ message: 'Please provide text' });
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await SonicSays(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/soraSelfies', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await soraSelfie(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/sos', async (req, res) => {
    const { message } = req.query;
    if (!message) return res.status(400).json({ message: 'Please provide a message' });
    if (message.length > 10) return res.status(406).send(JSON.stringify({ error: 'Message should be less than 10 characters' }));
    try {
        const buffer = await sos(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/spiderman-pointing', async (req, res) => {
    const { first, second } = req.query;
    if (!first || !second) return res.status(400).json({ message: 'Please provide two images' });
    if (first.length > 500 || second.length > 500) return res.status(406).send(JSON.stringify({ error: 'Image url should be less than 500 characters' }));
    try {
        const buffer = await SpidermanPointing(first, second);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/spongebob-burn', async (req, res) => {
    const { burn, person } = req.query;
    if (!burn || !person) return res.status(400).json({ message: 'Missing Parameters' });
    if (burn.length > 150 || person.length > 15) return res.status(406).send(JSON.stringify({ error: 'Image url and person should be less than 15 characters' }));
    try {
        const buffer = await SpongebobBurn(burn, person);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/that-sign-wont-stop-me', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ message: 'Please provide text' });
    if (text.length > 500) return res.status(406).send(JSON.stringify({ error: 'Text too long' }));
    try {
        const buffer = await ThatSignWontStopMe(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/ThisGuy', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await ThisGuy(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/ToBeContinued', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await ToBeContinued(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/TuxedoPooh', async (req, res) => {
    const { normal, tuxedo }  = req.query;
    if (!normal || !tuxedo) return res.status(400).json({ message: 'Please provide two images' });  
    if (normal.length > 500 || tuxedo.length > 500) return res.status(406).send(JSON.stringify({ error: 'Image url should be less than 500 characters' }));
    try {
        const buffer = await TuxedoPooh(normal, tuxedo);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/TwoButtons', async (req, res) => {
    const { first, second } = req.query;
    if (!first || !second) return res.status(400).json({ message: 'Please provide two images' });
    if (first.length > 280 || second.length > 280) return res.status(406).send(JSON.stringify({ error: 'Image url should be less than 280 characters' }));
    try {
        const buffer = await TwoButtons(first, second);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/UltimateTattoo', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await UltimateTattoo(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/VietnamFlashbacks', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await VietnamFlashbacks(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/WorseThanHitler', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await WorseThanHitler(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

router.get('/worthless', async (req, res) => {
    const { image } = req.query;
    if (!image) return res.status(400).json({ message: 'Please provide an image' });
    try {
        const buffer = await worthless(image);
        if (buffer === 0) return res.status(406).send(JSON.stringify({ error: 'Invalid image url' }));
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        res.status(500).send(JSON.stringify({ error: err }));
    }
});

module.exports = router;
