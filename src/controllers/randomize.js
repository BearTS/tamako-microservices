const fs = require('fs');
const randomize = (json) => {
    const api = fs.readFileSync(json);
    const objdata = JSON.parse(api);
    const keys = Object.keys(objdata);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    return objdata[randKey];
};
module.exports = randomize;
