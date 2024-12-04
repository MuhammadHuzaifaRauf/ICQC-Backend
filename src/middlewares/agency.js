const { decodeBearerToken } = require('../services/token.service');

const agencyMiddleware = (req, res, next) => {
  try {
    const decodedToken = decodeBearerToken(req);

    if (!decodedToken || !decodedToken.sub || !decodedToken.sub.agencyId) {
      throw new Error('Invalid or missing agencyId in token');
    }

    const agencyId = decodedToken.sub.agencyId;

    req.body.agencyId = agencyId;
    next();
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = agencyMiddleware;
