require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');

// Import models so associations are registered
require('./models/user.model');
require('./models/category.model');
require('./models/task.model');

const PORT = process.env.PORT || 5000;

async function start() {
    await connectDB();

    try {
        // Sync models to DB – in dev you can use { alter: true }
        await sequelize.sync();
        // await sequelize.sync({ alter: true }); // adjusts tables to models
        console.log('Models synchronized with MySQL');
    } catch (err) {
        console.error('Sequelize sync error:', err.message);
        process.exit(1);
    }

    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();