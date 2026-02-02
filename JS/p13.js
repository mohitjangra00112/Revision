
//// LocalStorage 


//   Storing Data 

// Store string data
localStorage.setItem('username', 'john_doe');
localStorage.setItem('theme', 'dark');

// Store using bracket notation
localStorage['language'] = 'english';

// Store using property notation
localStorage.userEmail = 'john@example.com';

// Store complex data (must be stringified)
const userPreferences = {
    theme: 'dark',
    notifications: true,
    language: 'en',
    fontSize: 16
};

localStorage.setItem('preferences', JSON.stringify(userPreferences));

// Store arrays
const favoriteColors = ['blue', 'green', 'red'];
localStorage.setItem('colors', JSON.stringify(favoriteColors));

// Store numbers (automatically converted to strings)
localStorage.setItem('userAge', 25);
localStorage.setItem('score', 1500);



//// retrieving Data 


// Get string data
const username = localStorage.getItem('username');
const theme = localStorage.getItem('theme');

console.log(username); // "john_doe"
console.log(theme); // "dark"

// Get using bracket notation
const language = localStorage['language'];

// Get using property notation
const email = localStorage.userEmail;

// Get complex data (must be parsed)
const preferencesString = localStorage.getItem('preferences');
const preferences = preferencesString ? JSON.parse(preferencesString) : {};

console.log(preferences.theme); // "dark"

// Get arrays
const colorsString = localStorage.getItem('colors');
const colors = colorsString ? JSON.parse(colorsString) : [];

console.log(colors[0]); // "blue"

// Get numbers (returned as strings)
const ageString = localStorage.getItem('userAge');
const age = parseInt(ageString, 10);

console.log(typeof ageString); // "string"
console.log(typeof age); // "number"



////   Removing Data



// Remove specific item
localStorage.removeItem('username');
localStorage.removeItem('theme');

// Remove using delete operator
delete localStorage.language;
delete localStorage.userEmail;

// Clear all local storage data
localStorage.clear();

// Check if item exists before removing
if (localStorage.getItem('preferences')) {
    localStorage.removeItem('preferences');
}



///// Checking Data exists 


// Check if key exists
function hasLocalStorageItem(key) {
    return localStorage.getItem(key) !== null;
}

// Usage
if (hasLocalStorageItem('username')) {
    console.log('Username is stored');
}

// Alternative method
function isItemStored(key) {
    return key in localStorage;
}

// Get all keys
function getAllLocalStorageKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    return keys;
}

console.log(getAllLocalStorageKeys());



