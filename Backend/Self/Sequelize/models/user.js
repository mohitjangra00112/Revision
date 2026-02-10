/////   user Model

const {DataTypes} = require('sequelize');
const sequelize = require("../connection");

const User = sequelize.define('User',{   // User -> db table name ( sequelize will lowercase it and add s in last and it will become 'users')
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        field:'user_id'      // Database column name
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(40),
        allowNull:true,
        field: 'email' // Database column name -> get clean JS without changing your DB. -> ex user -> user_name
    }
    },{
        tableName:'users',   ////  if you donot want the above default "User" but fixed tablename use this 
        timestamps: false, // Adds createdAt and updatedAt

    }
)

module.exports = User;