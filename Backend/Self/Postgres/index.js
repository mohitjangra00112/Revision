const pool = require('./connection');

// get all users 

const getUsers = async()=>{
    const res = await pool.query('select * from users');
    console.log(res.rows);
}

// getUsers();

const addUsers = async (name , email)=>{
    const res= await pool.query('Insert into users (name , email) values ($1 , $2) returning * ;', [name , email]);
    
    console.log(res.rows);
    
}

addUsers('XYZ' , 'xyz@gmail.com');
