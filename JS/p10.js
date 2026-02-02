// Creating a simple promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!"); // Fulfill the promise
        } else {
            reject("Operation failed!"); // Reject the promise
        }
    }, 1000);
});

console.log(myPromise); // Promise { <pending> }


//////////////////   My code  ////////////////////////

const myp = new Promise((resolve , reject )=>{
    const success =true;

    if(success){
        resolve("Promise success");
    }else{
        reject("Promise error ");
    }
})

myp.then((result)=>{     // then will run if promise resolved successuly 
    console.log(result);
}).catch((error)=>{           // catch if promise is rejected or error 
    console.log(error)
}).finally(()=>{
    console.log("finally")    // finally run everytime , even promise resolved or rejected 
})

///////   Promise Chaining 

function fetchUser(id) {
    return Promise.resolve({ id, name: `User${id}` });
}

function fetchUserPosts(userId) {
    return Promise.resolve([
        { id: 1, title: "Post 1", userId },
        { id: 2, title: "Post 2", userId }
    ]);
}

function fetchPostComments(postId) {
    return Promise.resolve([
        { id: 1, text: "Great post!", postId },
        { id: 2, text: "Thanks for sharing", postId }
    ]);
}

// Chaining promises
fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return fetchPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error in chain:", error);
    });


    // Basic Error Handling

function riskyOperation() {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        
        setTimeout(() => {
            if (random > 0.5) {
                resolve("Success!");
            } else {
                reject(new Error("Random failure"));
            }
        }, 1000);
    });
}

riskyOperation()
    .then(result => {
        console.log("Result:", result);
    })
    .catch(error => {
        console.error("Caught error:", error.message);
    });



    // Async Await 


    // Function declaration
async function fetchData() {
    return "Hello World";
}

// Function expression
const fetchDataExpression = async function() {
    return "Hello World";
};

// Arrow function
const fetchDataArrow = async () => {
    return "Hello World";
};

// Method in object
const obj = {
    async getData() {
        return "Hello World";
    }
};

// Method in class
class DataService {
    async fetchData() {
        return "Hello World";
    }
}



async function example() {
    // await can only be used inside async functions
    const result = await Promise.resolve("Hello");
    console.log(result); // "Hello"
    
    // await pauses execution until promise resolves
    const delayed = await new Promise(resolve => {
        setTimeout(() => resolve("Delayed"), 1000);
    });
    console.log(delayed); // "Delayed" (after 1 second)
}

example();



