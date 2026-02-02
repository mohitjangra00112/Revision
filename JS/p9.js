/////////  events /////

// Syntax 

Element.addEventListner("eventname" , (e)=>{
    // e.preventDefault();
    //////
})


// All events in 14 - Events ( Obsidian )


//  Attributes

const link = document.querySelector('a');

// Get attribute
const href = link.getAttribute('href');
const className = link.getAttribute('class');

// Set attribute
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');

// Remove attribute
link.removeAttribute('target');

// Check if attribute exists
const hasClass = link.hasAttribute('class');

// Direct property access (for standard attributes)
console.log(link.href); // Full URL
console.log(link.className); // Class names as string
console.log(link.id);

// Data attributes
link.setAttribute('data-user-id', '123');
console.log(link.dataset.userId); // "123" (camelCase conversion)
link.dataset.userRole = 'admin';



////// Style manipulation   


const element = document.querySelector('#title');

// Direct style properties
element.style.color = 'red';
element.style.fontSize = '24px';
element.style.backgroundColor = 'yellow';

// CSS properties with hyphens become camelCase
element.style.borderRadius = '5px';
element.style.marginTop = '10px';

// Get computed styles
const computedStyle = window.getComputedStyle(element);
console.log(computedStyle.color); // Computed color value
console.log(computedStyle.fontSize); // Computed font size

// CSS custom properties (variables)
element.style.setProperty('--main-color', 'blue');
const mainColor = computedStyle.getPropertyValue('--main-color');



/////// classes 

const element = document.querySelector('.container');

// Add classes
element.classList.add('active');
element.classList.add('highlight', 'important'); // Multiple classes

// Remove classes
element.classList.remove('highlight');

// Toggle class
element.classList.toggle('visible'); // Adds if not present, removes if present

// Check if class exists
const hasActive = element.classList.contains('active');

// Replace class
element.classList.replace('old-class', 'new-class');

// Class list as array
const classes = Array.from(element.classList);



//   Creating and Modifying Elements


// Create element
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');
const newImage = document.createElement('img');

// Set properties
newDiv.className = 'new-container';
newDiv.id = 'dynamic-content';
newParagraph.textContent = 'This is a new paragraph';
newImage.src = 'image.jpg';
newImage.alt = 'Description';


///// Insert Element 

const container = document.querySelector('.container');
const newElement = document.createElement('div');
newElement.textContent = 'New content';

// Append as last child
container.appendChild(newElement);

// Insert before specific element
const referenceElement = document.querySelector('.description');
container.insertBefore(newElement, referenceElement);

// Modern insertion methods
const anotherElement = document.createElement('span');

// Insert at different positions
container.prepend(anotherElement); // First child
container.append(anotherElement); // Last child

referenceElement.before(anotherElement); // Before reference
referenceElement.after(anotherElement); // After reference

// Insert adjacent HTML
referenceElement.insertAdjacentHTML('beforebegin', '<div>Before</div>');
referenceElement.insertAdjacentHTML('afterbegin', '<div>At start</div>');
referenceElement.insertAdjacentHTML('beforeend', '<div>At end</div>');
referenceElement.insertAdjacentHTML('afterend', '<div>After</div>');




//// Remove Element 


const element = document.querySelector('#unwanted');

// Modern way
element.remove();

// Old way (still works)
element.parentNode.removeChild(element);

// Remove all children
const container = document.querySelector('.container');
container.innerHTML = ''; // Quick but not ideal for event listeners

// Better way to remove all children
while (container.firstChild) {
    container.removeChild(container.firstChild);
}

// Or using modern methods
container.replaceChildren(); // Removes all children







