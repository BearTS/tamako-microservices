const request = require('node-superfetch');

const aiArtwork = async () => {
    const { body } = await request.get('https://thisartworkdoesnotexist.com/');
    return body;
};

const aiCat = async () => {
    const { body } = await request.get('https://thiscatdoesnotexist.com/');
    return body;
};

const aiWaifu = async() => {
    const num = Math.floor(Math.random() * 100000);
    const url = `https://www.thiswaifudoesnotexist.net/example-${num}.jpg`;
    return url;
};

// images > tamako , mai , and other animals

module.exports = {
    aiArtwork,
    aiCat,
    aiWaifu
};