/**************************************************
 * JAVASCRIPT ARRAY METHODS – USE + EXAMPLES
 **************************************************/

// push() → Adds elements to the END of an array (mutates array)
let arr1 = [1, 2];
arr1.push(3, 4);
console.log(arr1); // [1, 2, 3, 4]

// pop() → Removes the LAST element (mutates array)
arr1.pop();
console.log(arr1); // [1, 2, 3]

// unshift() → Adds elements to the START of an array
arr1.unshift(0);
console.log(arr1); // [0, 1, 2, 3]

// shift() → Removes the FIRST element
arr1.shift();
console.log(arr1); // [1, 2, 3]

/* ---------------------------------------------- */

// splice() → Add, remove, or replace elements at a specific index
let colors = ["red", "green", "blue"];
colors.splice(1, 1, "yellow"); // replace "green"
console.log(colors); // ["red", "yellow", "blue"]

// sort() → Sorts array elements (mutates array)
let nums = [5, 2, 9, 1];
nums.sort((a, b) => a - b); // ascending
console.log(nums); // [1, 2, 5, 9]

// reverse() → Reverses the array
nums.reverse();
console.log(nums); // [9, 5, 2, 1]

// fill() → Fills array with a static value
let filled = new Array(4).fill(0);
console.log(filled); // [0, 0, 0, 0]

/* ---------------------------------------------- */

// map() → Transforms each element and returns a NEW array
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]

// filter() → Returns elements that satisfy a condition
let evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2]

// reduce() → Reduces array to a single value
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 6

// forEach() → Iterates over array (no return value)
numbers.forEach(n => {
  console.log("Value:", n);
});

/* ---------------------------------------------- */

// find() → Returns FIRST element that matches condition
let users = [{id:1},{id:2},{id:3}];
let user = users.find(u => u.id === 2);
console.log(user); // {id: 2}

// findIndex() → Returns index of FIRST match
let index = users.findIndex(u => u.id === 3);
console.log(index); // 2

// indexOf() → Finds first index of a value
let arr2 = [1, 2, 3, 2];
console.log(arr2.indexOf(2)); // 1

// lastIndexOf() → Finds last index of a value
console.log(arr2.lastIndexOf(2)); // 3

// includes() → Checks if value exists (true/false)
console.log(arr2.includes(3)); // true

/* ---------------------------------------------- */

// some() → Returns true if AT LEAST ONE element passes test
let hasEven = arr2.some(n => n % 2 === 0);
console.log(hasEven); // true

// every() → Returns true if ALL elements pass test
let allPositive = arr2.every(n => n > 0);
console.log(allPositive); // true

/* ---------------------------------------------- */

// concat() → Merges arrays (returns new array)
let a = [1, 2];
let b = [3, 4];
let merged = a.concat(b);
console.log(merged); // [1, 2, 3, 4]

// slice() → Extracts part of array (non-mutating)
let animals = ["cat", "dog", "fish"];
let sliced = animals.slice(1, 3);
console.log(sliced); // ["dog", "fish"]

// join() → Converts array to string
let words = ["Hello", "World"];
console.log(words.join(" ")); // "Hello World"

/* ---------------------------------------------- */

// flat() → Flattens nested arrays
let nested = [1, [2, [3]]];
console.log(nested.flat(2)); // [1, 2, 3]

// flatMap() → map() + flat() in one step
let sentences = ["hi there", "hello world"];
let result = sentences.flatMap(s => s.split(" "));
console.log(result); // ["hi", "there", "hello", "world"]

/* ---------------------------------------------- */

// Array.from() → Creates array from iterable or array-like
let str = "abc";
console.log(Array.from(str)); // ["a", "b", "c"]

// Array.of() → Creates array from arguments
console.log(Array.of(5)); // [5]
console.log(Array(5));    // [empty × 5]
