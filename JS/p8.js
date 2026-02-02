/////////////  very impoprtant //////////////////

//// Higher order functions    /////


// map 
// filter
// for each 
// find() and findIndex()
// ### some() and every()


const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
];

let y = users.map((item)=>({...item , newid:6 }));


console.log(y)

let x=users.map((item)=>item.id);

console.log(x)

let arr=[1,2,3,4,5];

// reduce() is an array method that reduces an array to a single value.
// array.reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
//accumulator → the running total / accumulated value
// currentValue → the current item in the array
// initialValue → the starting value of the accumulator

let sum= arr.reduce((acc, curr)=>acc+curr , 0);

console.log(sum)


/////   map 

// Basic map usage
const numbers = [1, 2, 3, 4, 5];

// Square each number
const squared = numbers.map(x => x * x);
console.log(squared); // [1, 4, 9, 16, 25]

// Convert to strings
const strings = numbers.map(x => x.toString());
console.log(strings); // ['1', '2', '3', '4', '5']

// Working with objects
const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
];

// Extract specific properties
const names = users.map(user => user.name);
console.log(names); // ['John', 'Jane', 'Bob']

// Transform objects
const userSummaries = users.map(user => ({
    id: user.id,
    summary: `${user.name} (${user.age} years old)`
}));
console.log(userSummaries);

// Using index and array parameters
const numbersWithIndex = numbers.map((value, index, array) => ({
    value,
    index,
    isLast: index === array.length - 1
}));
console.log(numbersWithIndex);

// Chaining with other methods
const processedNumbers = numbers
    .map(x => x * 2)           // Double each number
    .map(x => x + 1)           // Add 1 to each
    .map(x => `Number: ${x}`); // Convert to string format

console.log(processedNumbers); // ['Number: 3', 'Number: 5', 'Number: 7', 'Number: 9', 'Number: 11']

// Complex transformations
const products = [
    { name: 'Laptop', price: 1000, category: 'Electronics', inStock: true },
    { name: 'Book', price: 20, category: 'Education', inStock: false },
    { name: 'Phone', price: 800, category: 'Electronics', inStock: true }
];

const productCards = products.map(product => ({
    ...product,
    priceWithTax: product.price * 1.1,
    displayName: product.name.toUpperCase(),
    availability: product.inStock ? 'Available' : 'Out of Stock',
    isExpensive: product.price > 500
}));

console.log(productCards);




//// filter   

// Basic filter usage
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evenNumbers = numbers.filter(x => x % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const largeNumbers = numbers.filter(x => x > 5);
console.log(largeNumbers); // [6, 7, 8, 9, 10]

// Working with objects
const users = [
    { id: 1, name: 'John', age: 30, active: true, role: 'admin' },
    { id: 2, name: 'Jane', age: 25, active: false, role: 'user' },
    { id: 3, name: 'Bob', age: 35, active: true, role: 'user' },
    { id: 4, name: 'Alice', age: 28, active: true, role: 'admin' }
];

// Filter active users
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);

// Filter admin users
const adminUsers = users.filter(user => user.role === 'admin');
console.log(adminUsers);

// Multiple conditions
const activeAdmins = users.filter(user => user.active && user.role === 'admin');
console.log(activeAdmins);

// Complex filtering
const eligibleUsers = users.filter(user => {
    return user.active && 
           user.age >= 25 && 
           user.age <= 35 &&
           user.name.length > 3;
});
console.log(eligibleUsers);

// Using index parameter
const firstHalf = users.filter((user, index, array) => index < array.length / 2);
console.log(firstHalf);

// Filter with external data
const allowedRoles = ['admin', 'moderator'];
const privilegedUsers = users.filter(user => allowedRoles.includes(user.role));
console.log(privilegedUsers);

// Remove duplicates using filter
const numbersWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const uniqueNumbers = numbersWithDuplicates.filter((value, index, array) => 
    array.indexOf(value) === index
);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// Filter falsy values
const mixedArray = [1, null, 2, undefined, 3, '', 4, 0, 5, false, 6];
const truthyValues = mixedArray.filter(Boolean);
console.log(truthyValues); // [1, 2, 3, 4, 5, 6]



//// reduce 



// Basic reduce usage
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15

// Product of all numbers
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(product); // 120

// Find maximum value
const max = numbers.reduce((acc, curr) => curr > acc ? curr : acc);
console.log(max); // 5

// Find minimum value
const min = numbers.reduce((acc, curr) => curr < acc ? curr : acc);
console.log(min); // 1

// Working with objects
const purchases = [
    { item: 'Book', price: 20, quantity: 2 },
    { item: 'Pen', price: 5, quantity: 5 },
    { item: 'Notebook', price: 15, quantity: 3 }
];

// Calculate total cost
const totalCost = purchases.reduce((total, purchase) => {
    return total + (purchase.price * purchase.quantity);
}, 0);
console.log(totalCost); // 110

// Group by category
const products = [
    { name: 'Laptop', category: 'Electronics', price: 1000 },
    { name: 'Book', category: 'Education', price: 20 },
    { name: 'Phone', category: 'Electronics', price: 800 },
    { name: 'Notebook', category: 'Education', price: 15 }
];

const groupedByCategory = products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
        groups[category] = [];
    }
    groups[category].push(product);
    return groups;
}, {});
console.log(groupedByCategory);

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((count, fruit) => {
    count[fruit] = (count[fruit] || 0) + 1;
    return count;
}, {});
console.log(fruitCount); // { apple: 3, banana: 2, orange: 1 }

// Flatten arrays
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArrays.reduce((acc, curr) => acc.concat(curr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Create object from array
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
console.log(usersById);

// Complex data processing
const sales = [
    { salesperson: 'John', amount: 1000, month: 'January' },
    { salesperson: 'Jane', amount: 1500, month: 'January' },
    { salesperson: 'John', amount: 1200, month: 'February' },
    { salesperson: 'Bob', amount: 800, month: 'January' },
    { salesperson: 'Jane', amount: 1300, month: 'February' }
];

const salesSummary = sales.reduce((summary, sale) => {
    // Group by salesperson
    if (!summary.bySalesperson[sale.salesperson]) {
        summary.bySalesperson[sale.salesperson] = 0;
    }
    summary.bySalesperson[sale.salesperson] += sale.amount;
    
    // Group by month
    if (!summary.byMonth[sale.month]) {
        summary.byMonth[sale.month] = 0;
    }
    summary.byMonth[sale.month] += sale.amount;
    
    // Update totals
    summary.total += sale.amount;
    summary.count++;
    
    return summary;
}, {
    bySalesperson: {},
    byMonth: {},
    total: 0,
    count: 0
});

console.log(salesSummary);




//// forEach   



// Basic forEach usage
const numbers = [1, 2, 3, 4, 5];

// Print each number
numbers.forEach(number => {
    console.log(number);
});

// With index
numbers.forEach((number, index) => {
    console.log(`Index ${index}: ${number}`);
});

// Working with objects
const users = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
];

// Send email to each user (simulation)
users.forEach(user => {
    console.log(`Sending email to ${user.email}`);
    // sendEmail(user.email); // Would call actual email function
});

// Modify DOM elements (in browser environment)
const elements = document.querySelectorAll('.item');
elements.forEach((element, index) => {
    element.textContent = `Item ${index + 1}`;
    element.addEventListener('click', () => {
        console.log(`Clicked item ${index + 1}`);
    });
});

// Side effects with forEach
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 800 },
    { name: 'Tablet', price: 500 }
];

let totalValue = 0;
products.forEach(product => {
    totalValue += product.price;
    console.log(`Added ${product.name}: $${product.price}`);
});
console.log(`Total value: $${totalValue}`);

// Note: forEach doesn't return anything, unlike map
const result = numbers.forEach(x => x * 2);
console.log(result); // undefined

// Use map for transformations instead
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]





//// find and findIndex


// find() - returns first matching element
const numbers = [1, 3, 5, 8, 9, 12, 15];

// Find first even number
const firstEven = numbers.find(x => x % 2 === 0);
console.log(firstEven); // 8

// Find first number greater than 10
const firstLarge = numbers.find(x => x > 10);
console.log(firstLarge); // 12

// Working with objects
const users = [
    { id: 1, name: 'John', age: 30, active: true },
    { id: 2, name: 'Jane', age: 25, active: false },
    { id: 3, name: 'Bob', age: 35, active: true }
];

// Find user by id
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Jane', age: 25, active: false }

// Find first active user
const activeUser = users.find(u => u.active);
console.log(activeUser); // { id: 1, name: 'John', age: 30, active: true }

// Find user by name
const johnUser = users.find(u => u.name.toLowerCase() === 'john');
console.log(johnUser);

// findIndex() - returns index of first matching element
const firstEvenIndex = numbers.findIndex(x => x % 2 === 0);
console.log(firstEvenIndex); // 3 (index of number 8)

const activeUserIndex = users.findIndex(u => u.active);
console.log(activeUserIndex); // 0

// If no match found
const youngUser = users.find(u => u.age < 20);
console.log(youngUser); // undefined

const youngUserIndex = users.findIndex(u => u.age < 20);
console.log(youngUserIndex); // -1

// Complex find operations
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', inStock: true, price: 1000 },
    { id: 2, name: 'Book', category: 'Education', inStock: false, price: 20 },
    { id: 3, name: 'Phone', category: 'Electronics', inStock: true, price: 800 }
];

// Find available electronic product under $900
const affordableElectronics = products.find(product => 
    product.category === 'Electronics' && 
    product.inStock && 
    product.price < 900
);
console.log(affordableElectronics);




////    some and every 



// some() - returns true if at least one element matches
const numbers = [1, 3, 5, 7, 9];

// Check if some numbers are even
const hasEvenNumbers = numbers.some(x => x % 2 === 0);
console.log(hasEvenNumbers); // false

const mixedNumbers = [1, 3, 4, 7, 9];
const hasSomeEven = mixedNumbers.some(x => x % 2 === 0);
console.log(hasSomeEven); // true

// every() - returns true if all elements match
const allOdd = numbers.every(x => x % 2 !== 0);
console.log(allOdd); // true

const allPositive = numbers.every(x => x > 0);
console.log(allPositive); // true

// Working with objects
const users = [
    { name: 'John', age: 30, verified: true },
    { name: 'Jane', age: 25, verified: true },
    { name: 'Bob', age: 35, verified: false }
];

// Check if some users are verified
const someVerified = users.some(user => user.verified);
console.log(someVerified); // true

// Check if all users are verified
const allVerified = users.every(user => user.verified);
console.log(allVerified); // false

// Check if all users are adults
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // true

// Complex conditions
const products = [
    { name: 'Laptop', price: 1000, inStock: true, rating: 4.5 },
    { name: 'Phone', price: 800, inStock: true, rating: 4.8 },
    { name: 'Tablet', price: 500, inStock: false, rating: 4.2 }
];

// Check if some products are expensive (>$700) and in stock
const hasExpensiveInStock = products.some(product => 
    product.price > 700 && product.inStock
);
console.log(hasExpensiveInStock); // true

// Check if all products have good ratings (>4.0)
const allWellRated = products.every(product => product.rating > 4.0);
console.log(allWellRated); // true

// Validation using every()
function validateUserData(users) {
    const validationRules = [
        user => user.name && user.name.length > 0,
        user => user.age && user.age > 0,
        user => user.email && user.email.includes('@')
    ];
    
    return users.every(user => 
        validationRules.every(rule => rule(user))
    );
}

const validUsers = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Jane', age: 25, email: 'jane@example.com' }
];

const invalidUsers = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: '', age: 25, email: 'jane@example.com' } // Invalid name
];

console.log(validateUserData(validUsers)); // true
console.log(validateUserData(invalidUsers)); // false