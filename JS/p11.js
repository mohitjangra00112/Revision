
////   Fakestore API  -- >  https://fakestoreapi.com/products

///// get request 

// syntax    fetch(url , options);   // options is a object that container complete config  

// Note ->
// .json() is a method on the Response object
    // It:
    // 1. Reads the response body
    // 2. Converts JSON text into a JavaScript object
    // 3. Returns a Promise


async function getData(){
    let url = "https://fakestoreapi.com/products";
    let data = await fetch(url);
    let parseddata=await data.json();          
    console.log(parseddata);
}

// getData();


    //// post request 

 async function sendData(){
      let url = "https://fakestoreapi.com/products";
      const product = { title: 'New Product', price: 29.99 };
      let options= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }
      let response = await fetch(url , options);
      let data = await response.json();
      console.log(data);
 }   

 sendData();


////////////////// Put and Patch 

// PUT replaces the entire resource; PATCH updates only specified fields


async function updateUser(id, userData) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    return await response.json();
}

// Partial update with PATCH
async function patchUser(id, updates) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });
    
    return await response.json();
}





///// Delete 

async function deleteUser(id) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
    }
    
    // Some APIs return 204 No Content for successful deletion
    if (response.status === 204) {
        return { success: true };
    }
    
    return await response.json();
}


