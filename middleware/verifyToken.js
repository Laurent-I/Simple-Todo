const jwt = require('jsonwebtoken');

let tokenBlacklist = [];

exports.logout = (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    // Add the token to the blacklist
    tokenBlacklist.push(token);

    res.send('Logged out successfully');
};

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    // Check if the token is in the blacklist
    if (tokenBlacklist.includes(token)) return res.status(401).send('Token is no longer valid');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};