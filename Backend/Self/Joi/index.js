
//   npm install joi

const Joi = require('joi');

const userSchema = Joi.object({
    name:Joi.string().min(3).max(40).required(),
    email:Joi.string().min(3).max(40).required(),
});

const data = {
    name:"ABCDEF",
    email:"abcdef@gmail.com"
}

const {error , value} = userSchema.validate(data);  // to validate data 

if(error){
    console.log(error);
}else{
    console.log(data);
}