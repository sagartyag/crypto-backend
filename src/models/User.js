const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: false },
    sponsor: { type: DataTypes.INTEGER, allowNull: true }, // Parent user (sponsor)
    active_status: { type: DataTypes.ENUM('Active', 'Pending'), defaultValue: 'Pending' },
    jdate: { type: DataTypes.DATEONLY },
    adate: { type: DataTypes.DATEONLY , allowNull: true },
   
    
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
   
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    usdtTrc20: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    usdtBep20: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tpassword: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
    PSR: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TPSR: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sponsor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ParentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
,
    package: {
        type: DataTypes.DOUBLE(10, 2),  // Double type with 2 decimal places
        allowNull: false,
        defaultValue: 0.00
    }
    // balance: { type: DataTypes.FLOAT, defaultValue: 0 },
}, {
    tableName: 'users',
    timestamps: false
});



module.exports = User;
