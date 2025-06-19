const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log("Authorization Header:", req.header('Authorization'));

  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.user.id,
      role: decoded.user.role,
      username: decoded.user.username || decoded.username,
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
