
////  Basics Variables and DataTypes

//// Note 

// normal functions has their own this but arrow functions don't have their own this so we donot use arrow functions in objects

//ex 

// let obj= {
//     name:"Nipun",
//     arrow:()=>{
//         console.log(this.name);
//     },
//     normal:function(){
//         console.log(this.name);
//     }
// }

// obj.arrow();   // undefined 
// obj.normal();  // Nipun 

///////////////////////////////////////////////////////////////////////


//// Array type checking

Array.isArray([1, 2, 3]); // true

////  Rest parameter -> used when we don't know number of paramters 

function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1,2,3,4,5,6))

//// function vs method 


// Function - this refers to global object (window in browser)
function globalFunction() {
    console.log(this); // Window object (in browser)
}

// Method - this refers to the object
const obj = {
    method: function() {
        console.log(this); // obj
    }
};



// IIFE (Immediately Invoked Function Expression)

(
    function(){
        console.log("HELLO");
    }
)();

(
    ()=>{
        console.log("HELLO");
    }
)();


//////////  call ,apply , bind 



