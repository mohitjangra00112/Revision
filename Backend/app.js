const express =require("express");
const app=express();


app.get("/",(req,res)=>{
    // res.send("hello, world");
    res.json({ message: 'GET request to homepage' });

})


app.listen(3000 , ()=>{
    console.log("Server started");
})