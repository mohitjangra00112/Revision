const express= require("express");
const cors = require('cors');


const app= express();

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET' , 'POST ', 'PATCH' , 'PUT' , 'DELETE'],
    credentials:true    //// Allows cookies/auth headers
}
))

const data = [
    {name:"ABCD" , email:"abcd@gmail.com"},
    {name:"XYZ" , email:"xyz@gmail.com"}
]

app.get("/data" , (req,res)=>{
    res.json(data);
})

module.exports = app;

