const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'user_id',
        },
    },
    {
        tableName: 'categories',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['name', 'user_id'], // unique per user
            },
        ],
    }
);

// Associations
Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Category, { foreignKey: 'userId', as: 'categories' });

module.exports = Category;