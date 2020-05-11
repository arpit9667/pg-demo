const Sequelize = require('sequelize');

module.exports = new Sequelize('codegig', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: 'postgres',
    port: "5432",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});


