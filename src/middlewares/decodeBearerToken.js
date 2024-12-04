const jwt = require('jsonwebtoken');
const config = require('../config/config');



function getBearerToken(req) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
  
    return authHeader.split(' ')[1];
  }
function decodeBearerToken(req) {
  const token = getBearerToken(req);

  if (!token) {
    throw new Error('No valid Bearer token');
  }

  try {
    const decodedToken = jwt.verify(token, config.jwt.secret); 
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    throw new Error('Invalid token or signature');
  }
}

module.exports = {
  decodeBearerToken
};


  