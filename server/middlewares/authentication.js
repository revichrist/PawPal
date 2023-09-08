const { verifyToken } = require("../helpers");
const {User} = require('../models')

async function authentication(request, response, next) {
  try {
    
    const {access_token} = request.headers

    if (!access_token) throw {name: 'JsonWebTokenError'}

    const validateToken = verifyToken(access_token)

    if (!validateToken) throw { name: "JsonWebTokenError" };

    const userData = await User.findOne({
      where: {
        email: validateToken.email
      }
    });

    if (!userData) throw { name: "JsonWebTokenError" };

    request.user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      isAdmin: userData.isAdmin
    }

    
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication;
