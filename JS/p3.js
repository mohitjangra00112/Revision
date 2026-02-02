
///////////////////////////////////////////////// scrict Mode    ////////////////////////////////

//// global strictmode 

"use strict";

// All code in this file is in strict mode
var x = 10;
function myFunction() {
    // This function is also in strict mode
}



/// function level strict mode 


function strictFunction() {
    "use strict";
    // Only this function is in strict mode
}

function normalFunction() {
    // This function is not in strict mode
}


//// changes in strict mode 


//  Prevents Global Variable Creation

// Throws Errors for Duplicate Parameter Names

// Error in strict mode
function duplicateParams(a, b, a) { // SyntaxError
    return a + b;
}


//  Restricts `delete` Operator

var x = 1;
delete x; // SyntaxError in strict mode



//// Benefits of Strict Mode

// Catches Common Coding Mistakes -> syntax and typos 
// Better Performance
