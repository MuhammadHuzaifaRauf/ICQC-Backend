const { decodeBearerToken } = require('./decodeBearerToken');

const authId = (req, res, next) => {
  try {
    const decodedToken = decodeBearerToken(req);
    if (!decodedToken || !decodedToken.sub || !decodedToken.sub.userId) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid token or user ID not found' });
    }
    
    req.userId = decodedToken.sub.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authId;
