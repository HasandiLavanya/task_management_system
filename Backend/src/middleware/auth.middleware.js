const { verifyToken } = require('../utils/jwt');
const User = require('../models/user.model');

async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = header.split(' ')[1];

    try {
        const payload = verifyToken(token); // { userId, username }
        const user = await User.findByPk(payload.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // attach Sequelize user instance
        next();
    } catch (err) {
        console.error('Auth error:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;