const { Sequelize } = require('sequelize');

// Read from env or use defaults
const DB_NAME = process.env.MYSQL_DB || 'task_manager_db';
const DB_USER = process.env.MYSQL_USER || 'root';
const DB_PASS = process.env.MYSQL_PASS || '';
const DB_HOST = process.env.MYSQL_HOST || '127.0.0.1';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false, // set to console.log if you want to see queries
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (err) {
        console.error('MySQL connection error:', err.message);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    connectDB,
};