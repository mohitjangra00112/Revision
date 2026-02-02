
////   ENV

/// npm i dotenv

const dotenv = require("dotenv");

dotenv.config();

let port = process.env.PORT;
let host = process.env.DB_HOST;
let user = process.env.DB_USER;

console.log(port);
console.log(host);
console.log(user);

