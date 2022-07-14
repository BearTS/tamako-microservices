const Josh = require('@joshdb/core');
const provider = require('@joshdb/mongo');

const userTable = new Josh({
    name: 'UserManager',
    provider,
    providerOptions: {
        collection: 'UserManager',
        url: process.env.MONGO_URI,
    }
});

const canvasData = new Josh({
    name: 'CanvasManager',
    provider,
    providerOptions: {
        collection: 'CanvasManager',
        url: process.env.MONGO_URI,
    },
});

module.exports.canvasData = canvasData;
module.exports.userTable = userTable;