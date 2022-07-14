const { stripIndent } = require('common-tags');
const request = require('node-superfetch');
const { join } = require('path');

const eightBall = async () => {
    const answers = [
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ];
    return answers[Math.floor(Math.random() * answers.length)];
};

const advice = async () => {
    const { text } = await request.get('http://api.adviceslip.com/advice');
    const body = JSON.parse(text);
    return body;
};

const bearJoke = async () => {
    const jokes = require(join(__dirname, '..', 'assets', 'json', 'bearjoke.json'));
    return jokes[Math.floor(Math.random() * jokes.length)];
};

const charlieCharlie = async (question) => {
    const answer = ['yes', 'no'];
    const response = stripIndent`
    _${question}_
    \`\`\`
        ${answer === 'no' ? '\\' : ' '}  |  ${answer === 'yes' ? '/' : ' '}
      NO ${answer === 'no' ? '\\' : ' '} | ${answer === 'yes' ? '/' : ' '}YES
          ${answer === 'no' ? '\\' : ' '}|${answer === 'yes' ? '/' : ' '}
    ————————————————
          ${answer === 'yes' ? '/' : ' '}|${answer === 'no' ? '\\' : ' '}
      YES${answer === 'yes' ? '/' : ' '} | ${answer === 'no' ? '\\' : ' '}NO
        ${answer === 'yes' ? '/' : ' '}  |  ${answer === 'no' ? '\\' : ' '}
    \`\`\`
`;
    return response;
};

const compliment = async () => {
    const compliments = require(join(__dirname, '..', 'assets', 'json', 'compliment.json'));
    return compliments[Math.floor(Math.random() * compliments.length)];
};

module.exports = {
    eightBall,
    advice,
    bearJoke,
    charlieCharlie,
    compliment
};