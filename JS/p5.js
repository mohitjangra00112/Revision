
// Constructor function
function Person(name) {
    this.name = name;
}

// Adding method to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

Person.prototype.species = "Homo sapiens";

const john = new Person("John");
console.log(john.greet()); // "Hello, I'm John"
console.log(john.species); // "Homo sapiens"

// john doesn't have these properties directly
console.log(john.hasOwnProperty("greet")); // false
console.log(john.hasOwnProperty("species")); // false
console.log(john.hasOwnProperty("name")); // true



//////////   class  


// ES6 class syntax
class Person {
    // Constructor method
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Instance methods
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    getAge() {
        return this.age;
    }
    
    setAge(newAge) {
        if (newAge > 0 && newAge < 150) {
            this.age = newAge;
        } else {
            throw new Error('Invalid age');
        }
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.age} years old)`;
    }
    
    // Setter
    set info(value) {
        const [name, age] = value.split(' (');
        this.name = name;
        this.age = parseInt(age);
    }
    
    // Static method
    static createAnonymous() {
        return new Person('Anonymous', 0, 'no-email@example.com');
    }
    
    // Static property (ES2022)
    static species = 'Homo sapiens';
}

// Usage
const person = new Person('Alice', 28, 'alice@example.com');
console.log(person.greet()); // "Hello, I'm Alice"
console.log(person.info); // "Alice (28 years old)" (getter)

person.info = 'Bob (35'; // Using setter
console.log(person.name); // "Bob"

// Static method usage
const anon = Person.createAnonymous();
console.log(Person.species); // "Homo sapiens"

// Class is just syntactic sugar over constructor functions
console.log(typeof Person); // "function"
console.log(person instanceof Person); // true




///// class Inheritance 



// Base class
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.isAlive = true;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
    
    move() {
        return `${this.name} moves`;
    }
    
    static getKingdom() {
        return 'Animalia';
    }
}

// Derived class
class Dog extends Animal {
    constructor(name, breed, age) {
        // Call parent constructor
        super(name, 'Canis lupus');
        this.breed = breed;
        this.age = age;
    }
    
    // Override parent method
    speak() {
        return `${this.name} barks`;
    }
    
    // Call parent method
    move() {
        return super.move() + ' by running';
    }
    
    // New method
    wagTail() {
        return `${this.name} wags tail happily`;
    }
    
    // Static method
    static getDomesticationPeriod() {
        return '15,000 years ago';
    }
}

// Usage
const dog = new Dog('Buddy', 'Golden Retriever', 3);
console.log(dog.speak()); // "Buddy barks"
console.log(dog.move()); // "Buddy moves by running"
console.log(dog.wagTail()); // "Buddy wags tail happily"

// Inheritance chain
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(Object.getPrototypeOf(dog)); // Dog.prototype
console.log(Object.getPrototypeOf(Dog.prototype)); // Animal.prototype

// Static methods
console.log(Animal.getKingdom()); // "Animalia"
console.log(Dog.getDomesticationPeriod()); // "15,000 years ago"





/////////////////////////////////  class Inheritance ////////////

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    bark() {
        return `${this.name} barks!`;
    }
}

const dog = new Dog("Max", "Labrador");


