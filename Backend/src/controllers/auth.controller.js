const User = require('../models/user.model');
const { signToken } = require('../utils/jwt'); // or wherever your jwt helper is

// Register new user
async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existing = await User.findOne({ where: { username } });
        if (existing) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const user = await User.create({ username, email, password });

        const token = signToken({ userId: user.id, username: user.username });

        return res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            access: token,
        });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Login
async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Sequelize syntax
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = signToken({ userId: user.id, username: user.username });

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            access: token,
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

// /auth/me
async function me(req, res) {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error('Me error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register,
    login,
    me,
};