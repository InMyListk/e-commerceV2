# MERN e-commerce

# FINSHED

1. Created react app via vite
2. Created git repository
3. List Products
   1. create products array
   2. add products images
   3. render produtcs
   4. style products
4. Add routing
   1. npm i react-router-dom
   2. create route for home scream
   3. create route for product screen
5. Create Node.JS Server
   1. run npm init in root folder
   2. Update package.json set type: module
   3. Add .ts to imports
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. require express
   8. create route for / return backend is ready.
   9. move products.js from frontend to backend
   10. create route for /api/products
   11. return products
   12. run npm start
6. Fetch Products From Backend
   1. set proxy in package.json
   2. npm install axios
   3. use state hook
   4. use effect hook
   5. use reducer hook
7. Manage State By Reducer Hook
   1. define reducer
   2. update fetch data
   3. get state from usReducer
8. Add bootstrap UI Framework
   1. npm install react-bootstrap bootstrap
   2. update App.js
9. Create Product and Rating Component
   1. create Rating component
   2. Create Product component
   3. Use Rating component in Product component
10. Create Product Details Screen
    1. fetch product from backend
    2. create 3 columns for image, info and action
11. Create Loading and Message Component
    1. create loading component
    2. use spinner component
    3. craete message component
    4. create utils.js to define getError fuction
12. Create React Context For Add Item To Cart
    1. Create React Context
    2. define reducer
    3. create store provider
    4. implement add to cart button click handler
13. Complete Add To Cart
    1. check exist item in the cart
    2. check count in stock in backend
14. Create Cart Screen
    1. create 2 columns
    2. display items list
    3. create action column
15. Complete Cart Screen
    1. click handler for inc/dec item
    2. click handler for remove item
    3. click handler for checkout
16. Create Signin Screen
    1. create sign in form
    2. add email and password
    3. add signin button
17. Connect To MongoDB Database
    1. create atlas monogodb database
    2. install local mongodb database
    3. npm install mongoose
    4. connect to mongodb database
18. Seed Sample Products
    1. create Product model
    2. create seed route
    3. use route in server.js
    4. seed sample product
19. Seed Sample Users
    1. create user model
    2. seed sample users
20. Create Signin Backend API
    1. create signin api
    2. npm install jsonwebtoken
    3. define generateToken
21. Complete Signin Screen
    1. handle submit action
    2. save token in store and local storage
    3. show user name in header
22. Create Shipping Screen
    1. create form inputs
    2. handle save shipping address
    3. add checkout wizard bar
23. Create Sign Up Screen
    1. create input forms
    2. handle submit
    3. create backend api
24. Implement Select Payment Method Screen
    1. create input forms
    2. handle submit
25. Create Place Order Screen
    1. show cart items, payment and address
    2. calculate order summary
26. Implement Place Order Action
    1. handle place order action
    2. create order create api
