const { generateToken, sendMail, validatePassword } = require("../helpers");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(request, response, next) {
    try {
      const { username, email, password, imageUrl } = request.body;

      const isAdmin = false;

      const data = await User.create({
        username,
        email,
        password,
        isAdmin,
      });

      const payload = {
        email,
        username,
      };

      sendMail(payload, "Register");

      response.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const userData = await User.findOne({
        where: {
          email,
        },
      });

      if (!userData) throw { name: "Unauthorized" };

      const validation = validatePassword(password, userData.password);

      if (!validation) throw { name: "Unauthorized" };

      const access_token = generateToken({
        id: userData.id,
        email: userData.email,
      });

      response.status(200).json({
        access_token,
        isAdmin: userData.isAdmin
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(request, response, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { google_token } = request.headers;

      if (!google_token) throw { name: "GoogleTokenError" };

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { email, given_name: username, picture:imageUrl } = payload;
      const password = "google_password";

      const [data, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          password,
          username,
          imageUrl
        },
        hooks: false,
      });

      const access_token = generateToken({
        id: data.id,
        email: data.email,
      });

      response.status(200).json({
        access_token,
        isAdmin: data.isAdmin
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
