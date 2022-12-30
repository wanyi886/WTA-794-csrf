const jwt = require('jsonwebtoken');
const secret = "sCg5EClrcHdN0PG4O4Lc5RMosTsHfnIF"

function generateKey () {
    return Math.floor(Math.random() * Date.now())
}

function setTokenCookie (res, user) {
    const token = jwt.sign(
        { user_id: user.id, user_name: user.username },
        secret,
        { expiresIn: 600000 }
    )

    res.cookie('token', token);
    return token;
}

module.exports = { generateKey, setTokenCookie }