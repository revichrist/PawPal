const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function validatePassword(inputPassword, databasePassword) {
  return bcrypt.compareSync(inputPassword, databasePassword);
}

module.exports = { hashPassword, validatePassword };
