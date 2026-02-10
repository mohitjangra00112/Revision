
// Main file  ->  Import the Sequelize instance and models and execute query ;

const sequelize = require('./connection');
const User = require('./models/user');



//////  CRUD Operations 

// Create / Insert 

 const createUser = async()=>{
    const res = await User.create({
        name:"AAAAA",
        email:"A@gmail.com"
    })
    console.log(res.dataValues);
 }

//  createUser();


 //////   Select 

 // select All

 const getAllUsers = async()=>{
    const res= await User.findAll({raw:true});    //// { raw:true } will only give the rows , else we will get the complete response
    console.log(res);
 }

//  getAllUsers();


// Select one 

const getUser = async () => {
    const res = await User.findOne({
        raw:true,
        where:{
            id:2
        }
    })

    // const res= await User.findByPk(2 , {
    //     raw:true
    // });

    console.log(res);
}

// getUser();


////   Update  

const updateUser = async ()=>{
    const res = await User.update({
        name:"Test",
        email:"test@gmail.com"
    },
    {   
        where:{
            id:5
        },
        raw:true,
        returning:true,
    }
  )

  console.log(res);
}

// updateUser();


//////     Update or create 

// Sequelize has a built-in upsert method, which is the easiest production-level way:

// const [user, created] = await User.upsert({
//     id: 1,
//     firstName: 'John',
//     lastName: 'Updated',
//     email: 'john@example.com',
//     passwordHash: 'new_hash'
// });



////////////    Delete  

const deleteUser = async ()=>{
   
    const res = await User.destroy({
        where:{
            id:6
        }
    })
    console.log(res);

}

deleteUser();

