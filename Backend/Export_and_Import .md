
// Import and Export 

// If wwe use default then we can use only name ex const utils =require("./abc); 
// but if donot use default then we need to destructure ex const {name , age} = require("./abc);
// In node single export can be require without destructuring but multiple exports need {destructuring} ; 

<!--  node  -->

// import without destr.

const abc= "abc";
module.exports = abc;

const abc=require("./file);


<!--  impoer with destr. -->

const x="abc";
const n=10;

module.exports={x , n};

const {x , n } = require("./file);


 <!-- ES6 / react import and export  -->

 <!-- without destr. -->

<!-- single  -->

const x= 5;

export default x;

import x from ("./file);

<!-- Multiple export wihtout destr. -->

const a=10;
const b=20;

export default {a , b};

import utils from "./file";
console.log(utils.a);

<!--  note -> we canot use {a,b} because default exports the file as a single object but later we can use let {a,b} = utils; -->

<!-- import and export with destructuring {} -->

export {a,b};

import {a,b} from "./file";