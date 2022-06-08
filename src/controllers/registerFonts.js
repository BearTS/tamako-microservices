const { readdirSync  } = require('fs');
const { registerFont } = require('canvas');
const { join } = require('path');
const filterfonttypes  = x => ['ttf', 'otf'].includes(x.split('.').pop());

for (const fontFileName of readdirSync('src/resources/assets/fonts').filter(filterfonttypes)){
    const [ family, weight ] = fontFileName.split(/\.(t|o)tf/)[0].split(' ');
    registerFont(join('src/resources/assets/fonts', fontFileName), { family: family.split('-').join(' '), weight: weight?.toLowerCase() });
}