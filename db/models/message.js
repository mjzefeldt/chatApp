const Sequelize = require('sequelize');
const db = require('../index.js');

const { TEXT } = Sequelize;

const Message = db.define('message', {
    text: {
        type: TEXT
    }
});

module.exports = Message;
