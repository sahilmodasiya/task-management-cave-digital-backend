const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.split(" ")[1]
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
