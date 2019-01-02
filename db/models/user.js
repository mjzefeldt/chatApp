const Sequelize = require('sequelize');
const db = require('../index');

const { STRING } = Sequelize;

const User = db.define('user', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = User;
