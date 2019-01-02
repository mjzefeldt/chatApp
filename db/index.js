const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/chatHistory', {
    logging: false
});

// register models
// require('./models');

module.exports = db;
