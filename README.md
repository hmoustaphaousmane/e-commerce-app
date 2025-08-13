# e-commerce-app

This is an e-commerce app API built using MongoDB, Express and NodeJS.

The API exposes the following endpoints

- POST "/auth/register" endpoint that accepts full name, email, password and role. Role can be either "admin" or "customer".
- POST "/auth/login" endpoint that allows the user to login. Note: Your JWT should have userId, email and role.
- GET "/products" endpoint to get products list .
- POST "/products" endpoint that adds a product. The product should have a "productName", "ownerId", "cost", "productImages" (array of image links), "description" and "stockStatus". The ownerId will hold the ID of the admin that posted the product.
- DELETE "/products/:id" endpoint that removes a product from the list of products.

Note: The product POST and product DELETE endpoints are only accessible by the admin while the GET endpoint could be accessed by anybody.

Authorization is being able to restirc access to users
