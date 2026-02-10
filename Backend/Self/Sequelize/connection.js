//// Dependencies 
//// npm install express sequelize pg pg-hstore

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres'
// });

const sequelize = new Sequelize({
    host:'localhost',
    username:'postgres',
    password:'1234',
    database:'Test1',
    port:'5432',
    dialect:'postgres'
});


////   Test connection 

const testConnection = async()=>{
    const res = await sequelize.authenticate();
    console.log(' Database connection established successfully.');
}

testConnection();


module.exports = sequelize;