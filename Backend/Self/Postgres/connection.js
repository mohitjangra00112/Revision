
// npm install pg

// connection 


const {Pool} = require('pg');

// const pool = new Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT,
// });

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'Test1',
    port:'5432'
});

/////////// Optional , Used to check the connect before doing any operations 

//// Then - Catch method 

// pool.connect()
// .then((res)=>{
//     console.log("Connected to Postgres");
//     // console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

////  Async - Await Method 

const testConnection = async()=>{
    let res = await pool.connect();
    console.log("Connected to Postgres");
}

testConnection();

module.exports = pool;

