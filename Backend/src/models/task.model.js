const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');
const Category = require('./category.model');

const STATUS = ['TODO', 'IN_PROGRESS', 'DONE'];

const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        status: {
            type: DataTypes.ENUM(...STATUS),
            allowNull: false,
            defaultValue: 'TODO',
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'user_id',
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field: 'category_id',
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'due_date',
        },
    },
    {
        tableName: 'tasks',
        timestamps: true,
        underscored: true,
    }
);

// Associations
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

Task.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Task, { foreignKey: 'categoryId', as: 'tasks' });

module.exports = Task;
module.exports.STATUS = STATUS;