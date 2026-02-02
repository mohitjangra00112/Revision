////////////////////////////////////  Hoisting    /////////////////////

//// var hoisting 

console.log(myVar); // undefined (not error)
var myVar = 5;
console.log(myVar); // 5


//// let and const hoisting 

// Temporal Dead Zone
console.log(myLet); // ReferenceError: Cannot access before initialization
let myLet = 5;

console.log(myConst); // ReferenceError: Cannot access before initialization
const myConst = 10;


//// function are full hoisted but functional expressions are not hoisted 

// Function expressions are not hoisted
sayGoodbye(); // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
    console.log("Goodbye!");
};


//// Arrow functions are not hoisted 

// Arrow functions are not hoisted
arrowFunc(); // TypeError: arrowFunc is not a function

var arrowFunc = () => {
    console.log("Arrow function");
};

