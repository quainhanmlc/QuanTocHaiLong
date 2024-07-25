const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') 
  // or an array of roles (e.g. ['admin', 'manager'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // Authenticate JWT token and attach user to request object (req.user)
    async (req, res, next) => {
      const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        if (req.path !== '/auth/login' && req.path !== '/auth/logout') {
          return res.redirect('/auth/login');
        }
      } else {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id);
          if (!req.user) {
            return res.redirect('/auth/login');
          }
          if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have access to this resource' });
          }
        } catch (error) {
          return res.redirect('/auth/login');
        }
      }
      next();
    }
  ];
};

module.exports = auth;
