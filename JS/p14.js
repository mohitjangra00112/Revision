
//////////////////////  set data ////////////////////

// Store simple strings
sessionStorage.setItem('currentUser', 'john_doe');
sessionStorage.setItem('sessionToken', 'abc123xyz789');

// Store using bracket notation
sessionStorage['currentPage'] = 'dashboard';

// Store using property notation
sessionStorage.userRole = 'admin';

// Store complex data (requires JSON stringification)
const formData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    preferences: {
        newsletter: true,
        notifications: false
    }
};

sessionStorage.setItem('formData', JSON.stringify(formData));

// Store arrays
const visitedPages = ['home', 'about', 'products', 'contact'];
sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));

// Store timestamps
sessionStorage.setItem('sessionStart', new Date().toISOString());
sessionStorage.setItem('lastActivity', Date.now().toString());



//////////////////////   Get data    ///////////////////////////

// Get simple strings
const currentUser = sessionStorage.getItem('currentUser');
const sessionToken = sessionStorage.getItem('sessionToken');

console.log(currentUser); // "john_doe"
console.log(sessionToken); // "abc123xyz789"

// Get using bracket notation
const currentPage = sessionStorage['currentPage'];

// Get using property notation
const userRole = sessionStorage.userRole;

// Get complex data (requires JSON parsing)
const formDataString = sessionStorage.getItem('formData');
const formData = formDataString ? JSON.parse(formDataString) : {};

console.log(formData.firstName); // "John"
console.log(formData.preferences.newsletter); // true

// Get arrays
const visitedPagesString = sessionStorage.getItem('visitedPages');
const visitedPages = visitedPagesString ? JSON.parse(visitedPagesString) : [];

console.log(visitedPages.length); // 4

// Get and convert timestamps
const sessionStartString = sessionStorage.getItem('sessionStart');
const sessionStart = sessionStartString ? new Date(sessionStartString) : new Date();

const lastActivityString = sessionStorage.getItem('lastActivity');
const lastActivity = lastActivityString ? parseInt(lastActivityString, 10) : Date.now();




//////// remove data   



// Remove specific items
sessionStorage.removeItem('currentUser');
sessionStorage.removeItem('sessionToken');

// Remove using delete operator
delete sessionStorage.currentPage;
delete sessionStorage.userRole;

// Clear all session storage
sessionStorage.clear();

// Conditional removal
if (sessionStorage.getItem('formData')) {
    sessionStorage.removeItem('formData');
}

// Remove expired items
function removeExpiredItems() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i);
        const item = sessionStorage.getItem(key);
        
        try {
            const parsed = JSON.parse(item);
            if (parsed.timestamp && (now - parsed.timestamp) > maxAge) {
                sessionStorage.removeItem(key);
            }
        } catch {
            // Not a timestamped item, skip
        }
    }
}






//// checking data available or not 



// Check if item exists
function hasSessionItem(key) {
    return sessionStorage.getItem(key) !== null;
}

// Check using 'in' operator
function isKeyInSession(key) {
    return key in sessionStorage;
}

// Get session storage size
function getSessionStorageSize() {
    let total = 0;
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            total += sessionStorage[key].length + key.length;
        }
    }
    return total * 2; // UTF-16 encoding
}

// Get all keys
function getAllSessionKeys() {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        keys.push(sessionStorage.key(i));
    }
    return keys;
}

// Get all items
function getAllSessionItems() {
    const items = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        items[key] = sessionStorage.getItem(key);
    }
    return items;
}

// Usage examples
console.log(`Session has ${sessionStorage.length} items`);
console.log(`Total size: ${getSessionStorageSize()} bytes`);
console.log('All keys:', getAllSessionKeys());




