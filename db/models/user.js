const Sequelize = require('sequelize');
const db = require('../index');

const { STRING, TEXT } = Sequelize;

const User = db.define('user', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    message: {
        type: TEXT
    }
});

module.exports = User;
