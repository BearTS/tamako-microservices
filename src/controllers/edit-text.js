const { letterTrans, wordTrans } = require('custom-translate');
const request = require('node-superfetch');

const base64 = async (mode, text) => {
    if (mode === 'encode') {
        return Buffer.from(text).toString('base64');
    } else {
        return Buffer.from(text, 'base64').toString('utf8');
    }
};

const binary = async (text) => {
    return text.split('').map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, '0');
    }).join(' ');
};

const braille = async(text) => {
    const dictionary =  require('../resources/assets/json/braille.json');
    return letterTrans(text, dictionary);
};

const bronySpeak = async(text) => {
    const dictionary =  require('../resources/assets/json/brony-speak.json');
    return wordTrans(text, dictionary);
};

const cowSay = async (text) => {
    const { body } = await request
        .get('http://cowsay.morecode.org/say')
        .query({
            message: text,
            format: 'json'
        });
    return body.cow;
};

const cursive = async (text) => {
    const dictionary =  require('../resources/assets/json/cursive.json');
    return letterTrans(text, dictionary);
};

const Dvorak = async (text) => {
    const dictionary =  require('../resources/assets/json/dvorak.json');
    return letterTrans(text, dictionary);
};

const emojify = async (text) => {
    const dictionary = require('../resources/assets/json/emojify.json');
    return letterTrans(text, dictionary);
};

const fancy = async (text) => {
    const dictionary =  require('../resources/assets/json/fancy.json');
    return letterTrans(text, dictionary);
};

const hex = async (text) => {
    return Buffer.from(text).toString('hex');
};

const mocking = async (text) => {
    const letters = text.split('');
    for (let i = 0; i < letters.length; i += Math.floor(Math.random() * 4)) {
        letters[i] = letters[i].toUpperCase();
    }
    return letters.join('');
};

const morse = async (text) => {
    text = text.toLowerCase();
    const dictionary =  require('../resources/assets/json/morse.json');
    return letterTrans(text, dictionary);
};

const owo = async (text) => {
    const faces = ['(・\\`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];
    return text
        .replace(/(?:r|l)/g, 'w')
        .replace(/(?:R|L)/g, 'W')
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'NY$1')
        .replace(/ove/g, 'uv')
        .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
        .trim();
};

const reverse = async (text) => {
    return text.split('').reverse().join('');
};

const shipName = async (start, end) => {
    return `${start.slice(0, Math.floor(start.length / 2))}${end.slice(Math.floor(end.length / 2))}`;
};

const shortenURl = async (url) =>{
    const { body } = await request
        .post('https://api-ssl.bitly.com/v4/shorten')
        .send({ long_url: url })
        .set({ Authorization: `Bearer ${process.env.BITLY_KEY}` });
    return body.link;
};

const superscript = async (text) => {
    const dictionary =  require('../resources/assets/json/superscript.json');
    return letterTrans(text, dictionary);
};

const yodaSpeak = async (text) => {
    const { body } = await request
        .get('https://yoda-api.appspot.com/api/v1/yodish')
        .query({ text: text });
    return body.yodish;
};

const upsideDown = async (text) => {
    const dictionary =  require('../resources/assets/json/upside-down.json');
    return letterTrans(text, dictionary);
};

module.exports = {
    binary,
    base64,
    braille,
    bronySpeak,
    cowSay,
    cursive,
    Dvorak,
    emojify,
    fancy,
    hex,
    mocking,
    morse,
    owo,
    reverse,
    shortenURl,
    superscript,
    yodaSpeak,
    upsideDown,
    shipName
};