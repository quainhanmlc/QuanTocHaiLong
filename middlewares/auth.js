const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    async (req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
        return res.redirect('/auth/login');
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'You do not have access to this resource' });
        }
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }
  ];
};

module.exports = auth;
