const crypto = require('crypto');

const geradorToken = () => crypto.randomBytes(8).toString('hex');

module.exports = geradorToken;