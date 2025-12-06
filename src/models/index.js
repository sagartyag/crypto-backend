const sequelize = require("../config/connectDB");

// Import User model function
const User = require('./User');

// Initialize model with sequelize
const User = User(sequelize);

// Export models
module.exports = {
  sequelize,
  User,
};
