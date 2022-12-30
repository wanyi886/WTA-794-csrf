const crypto = require('crypto');

function generateKey () {
    return Math.floor(Math.random() * Date.now())
}

module.exports = { generateKey }