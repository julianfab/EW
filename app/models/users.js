const Sequelize = require('Sequelize');
const sequelize = new Sequelize('postgres','postgres','12345',{
    host:'localhost',
    dialect:'postgres',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorsAliases:false,
    define:{
        timestamps:false,
        freezeTableName:true
    }
});

const users = sequelize.define('users',{
    id:{
        primaryKey:true,
        type:Sequelize.CHAR
    },
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    email:Sequelize.STRING
},{
    tableName:'users'
});

sequelize.sync()
    .then(()=> users.create({
        id:'2',
        first_name: 'Kevin',
        last_name: 'Franco',
        email: 'francito@gmail.com'
    }))
    .then(kevin => {
        console.log(kevin.toJSON());
    });

sequelize.authenticate(function(){
    console.log("Base lista");
});

module.exports.users = users;