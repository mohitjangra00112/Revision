////////////// objects ///////////////////////////


// Basic object literal
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// With methods
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    
    // ES6 method shorthand
    subtract(a, b) {
        return a - b;
    },
    
    // Arrow function (be careful with 'this')
    multiply: (a, b) => a * b
};



//// constructor functions 

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        return `Hello, I'm ${this.name}`;
    };
}

const john = new Person("John", 30);
const jane = new Person("Jane", 25);



//////////////  getter and setter    



const person2 = {
    firstName: "John",
    lastName: "Doe",
    
    // Getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    // Setter
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

console.log(person2.fullName); // "John Doe"
person2.fullName = "Jane Smith";
console.log(person2.firstName); // "Jane"




//////// object Methods 


const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Get all keys
const keys = Object.keys(person);
console.log(keys); // ["name", "age", "city"]

// Get all values
const values = Object.values(person);
console.log(values); // ["John", 30, "New York"]

// Get key-value pairs
const entries = Object.entries(person);
console.log(entries); // [["name", "John"], ["age", 30], ["city", "New York"]]

// Convert back to object
const reconstructed = Object.fromEntries(entries);



const obj = { name: "John", age: 30 };

// Freeze - no modifications allowed
Object.freeze(obj);
obj.name = "Jane"; // Ignored (or error in strict mode)
obj.city = "Boston"; // Ignored
delete obj.age; // Ignored

// Seal - can modify existing properties but can't add/remove
const obj2 = { name: "John", age: 30 };
Object.seal(obj2);
obj2.name = "Jane"; // Works
obj2.city = "Boston"; // Ignored
delete obj2.age; // Ignored

// Prevent extensions - can't add new properties
const obj3 = { name: "John", age: 30 };
Object.preventExtensions(obj3);
obj3.name = "Jane"; // Works
obj3.city = "Boston"; // Ignored
delete obj3.age; // Works

// Check status
console.log(Object.isFrozen(obj)); // true
console.log(Object.isSealed(obj2)); // true
console.log(Object.isExtensible(obj3)); // false



//  Object.hasOwnProperty() and 'in' operator

const person = { name: "John", age: 30 };

// Check own properties
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("toString")); // false

// Check all properties (including inherited)
console.log("name" in person); // true
console.log("toString" in person); // true

// Modern way (Object.hasOwn in newer environments)
console.log(Object.hasOwn(person, "name")); // true



///// for in loop
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Iterates over enumerable properties (including inherited)
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`${key}: ${person[key]}`);
    }
}



/////// destructuring  in objects 


const person = { name: "John", age: 30, city: "New York" };

// Extract properties
const { name, age } = person;
console.log(name); // "John"
console.log(age); // 30

// Rename variables
const { name: fullName, age: years } = person;
console.log(fullName); // "John"

// Default values
const { name, height = 180 } = person;
console.log(height); // 180 (default)




