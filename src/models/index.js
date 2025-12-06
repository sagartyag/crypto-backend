const sequelize = require("../config/connectDB");
const User = require("./User");  // <-- already initialized model

module.exports = {
  sequelize,
  User,
};
