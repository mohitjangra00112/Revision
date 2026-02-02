
// npm install axios


//// Get Request 

const axios = require('axios');

async function getData(){
    let url = "https://fakestoreapi.com/products";
    
    let data = await axios.get(url);
  
    console.log(data.data);

}

// getData();


// Post Request 


////   Axios   Syntax  

//  const response = await axios.put(url, product, {
//       headers: { "Content-Type": "application/json" }
//     });


async function  sendData(){
    let url = "https://fakestoreapi.com/products";
    const product = { title: 'New Product', price: 29.99 };

    let response = await axios.post(url , product , { headers: { 'Content-Type': 'application/json' }});

    console.log(response);
    console.log(response.data);
}

// sendData();



////   PUT / PATCH 

async function update(){
    let url = "https://fakestoreapi.com/products/1";
    const product = { title: 'Updated Product', price: 39.99 };

    let response = await axios.put(url , product ,  {headers: { 'Content-Type': 'application/json' } });

    console.log(response);
    console.log(response.data);

}

// update();


////  Delete  

async function deleteData(){
    let url="https://fakestoreapi.com/products/1";

    let response = await axios.delete(url);

    console.log(response);
    console.log(response.data);
}

// deleteData();


///////////////////////////   Custom Axios Instances  ( Important )   ///////////////////////////////

// Create custom instance with specific config
const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Create another instance for different API
const authClient = axios.create({
    baseURL: 'https://auth.example.com',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Use instances
apiClient.get('/users')
    .then(response => console.log('API users:', response.data));

authClient.post('/login', { username: 'user', password: 'pass' })
    .then(response => console.log('Auth response:', response.data));

// Instance-specific configuration
apiClient.defaults.headers.common['X-API-Key'] = 'your-api-key';

// Override instance config for specific request
apiClient.get('/public-data', {
    timeout: 1000, // Override default timeout
    headers: {
        'Authorization': null // Remove authorization for public endpoint
    }
})
    .then(response => console.log('Public data:', response.data));



    //////   Imp    ///////


// Environment-specific configuration
const isDevelopment = process.env.NODE_ENV === 'development';

const environmentClient = axios.create({
    baseURL: isDevelopment 
        ? 'http://localhost:3000/api' 
        : 'https://api.production.com',
    timeout: isDevelopment ? 30000 : 10000,
    headers: {
        'X-Environment': isDevelopment ? 'development' : 'production'
    }
});


/////////////////   Imp   ///////////////////
/////  Interceptors //////////////////////

// Interceptors are functions that intercept requests or responses before they are handled by then or catch.

// Think of them as middleware for Axios requests/responses.

// Two types:

// Request interceptors → run before the request is sent

// Response interceptors → run after a response is received


///// syntax

axios.interceptors.request.use(
  successCallback,
  errorCallback
);

axios.interceptors.response.use(
  successCallback,
  errorCallback
);



//////   Request interceptors

// Request interceptor for authentication
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log('Sending request:', config.method?.toUpperCase(), config.url);
        
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add request timestamp
        config.metadata = { startTime: new Date() };
        
        return config;
    },
    function (error) {
        // Do something with request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Multiple request interceptors
axios.interceptors.request.use(config => {
    // Add correlation ID for tracking
    config.headers['X-Correlation-ID'] = Math.random().toString(36);
    return config;
});

axios.interceptors.request.use(config => {
    // Add user agent info
    config.headers['X-User-Agent'] = navigator.userAgent;
    return config;
});

// Conditional request interceptor
axios.interceptors.request.use(config => {
    // Only add API key for certain endpoints
    if (config.url?.includes('/api/')) {
        config.headers['X-API-Key'] = process.env.API_KEY;
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
        console.log('Request config:', {
            method: config.method,
            url: config.url,
            data: config.data,
            headers: config.headers
        });
    }
    
    return config;
});




///// Response Interceptor 


// Response interceptor for logging and error handling
axios.interceptors.response.use(
    function (response) {
        // Log response time
        const endTime = new Date();
        const startTime = response.config.metadata?.startTime;
        if (startTime) {
            const duration = endTime - startTime;
            console.log(`Request completed in ${duration}ms`);
        }
        
        // Log successful responses
        console.log('Response received:', response.status, response.statusText);
        
        return response;
    },
    function (error) {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            console.error('Response error:', error.response.status, error.response.data);
            
            // Handle specific status codes
            switch (error.response.status) {
                case 401:
                    console.warn('Unauthorized - redirecting to login');
                    // Redirect to login or refresh token
                    break;
                case 403:
                    console.warn('Forbidden - insufficient permissions');
                    break;
                case 404:
                    console.warn('Resource not found');
                    break;
                case 500:
                    console.error('Server error - please try again later');
                    break;
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network error - no response received');
        } else {
            // Something else happened
            console.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);



//////////////   Use of response inceptor  
///////  Instead of handling 401 or 500 errors in every .catch, use a response interceptor:


    axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized → redirect to login
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        alert("Server error! Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

// Refreshing Tokens Automatically

// When using JWTs, tokens may expire. Interceptors can catch 401, refresh the token, and retry the request:

// Logging & Analytics


//// imp   Transforming Responses

// Sometimes APIs return data you want to normalize:

axios.interceptors.response.use(response => {
  if (response.data && response.data.user) {
    response.data.user.fullName = `${response.data.user.firstName} ${response.data.user.lastName}`;
  }
  return response;
});




/////////////////////       Custom Instance and Interceptors example usage with async await //////////////////

// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: add auth token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status);
    return Promise.reject(error);
  }
);

export default api;



///// ## Error Handling

//  Comprehensive Error Handling



// Custom error class
class APIError extends Error {
    constructor(message, status, data, config) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
        this.config = config;
    }
}

// Error handling utility
function handleAxiosError(error) {
    if (error.response) {
        // Server responded with error status
        const { status, data, headers } = error.response;
        const message = data?.message || data?.error || `HTTP ${status} Error`;
        
        console.error('API Error:', {
            status,
            message,
            data,
            url: error.config?.url,
            method: error.config?.method
        });
        
        throw new APIError(message, status, data, error.config);
        
    } else if (error.request) {
        // Network error or no response
        const message = 'Network error - please check your connection';
        console.error('Network Error:', error.request);
        throw new APIError(message, 0, null, error.config);
        
    } else {
        // Request setup error
        const message = `Request Error: ${error.message}`;
        console.error('Request Setup Error:', error.message);
        throw new APIError(message, -1, null, error.config);
    }
}

// Usage with proper error handling
async function fetchUserWithErrorHandling(userId) {
    try {
        const response = await axios.get(`/users/${userId}`);
        return response.data;
        
    } catch (error) {
        handleAxiosError(error);
    }
}

// Retry mechanism for failed requests
async function retryRequest(requestFn, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            
            // Only retry on network errors or 5xx server errors
            if (error.response && error.response.status < 500) {
                throw error; // Don't retry client errors
            }
            
            console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Exponential backoff
        }
    }
}

// Usage with retry
async function robustApiCall() {
    try {
        const result = await retryRequest(
            () => axios.get('/unstable-endpoint'),
            3, // max retries
            1000 // initial delay
        );
        return result.data;
    } catch (error) {
        console.error('All retry attempts failed:', error);
        throw error;
    }
}

// Global error handler
axios.interceptors.response.use(
    response => response,
    error => {
        // Log all errors globally
        console.error('Axios Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            timestamp: new Date().toISOString()
        });
        
        // Show user-friendly error messages
        if (error.response?.status >= 500) {
            showNotification('Server error - please try again later', 'error');
        } else if (error.response?.status === 404) {
            showNotification('Requested resource not found', 'warning');
        } else if (!error.response) {
            showNotification('Connection error - please check your internet', 'error');
        }
        
        return Promise.reject(error);
    }
);

function showNotification(message, type) {
    // Implementation depends on your notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
}

