# Fullstack developer assignment
The task is to make an **application** for warehouse stock management.

## Description
The **API** should be able to handle:
- Authentication for product/stock management routes;
- Adding, updating, listing and deleting products;
- Managing the stock for each product;
- Accept requests to purchase the products;
- The purchase is accepted if the stock is available for all requested products;
- List all purchases;

The **Frontend** should be able to facilitate the use cases described below. You are not obliged to
implement every use case on the frontend, you are free to choose which one(s) you implement.

## Use cases
- Actors:
  - User: the person who manages the products and stock; Needs authentication;
  - Client: the person who makes purchase requests; Doesn't need authentication;

###### Use case 1 - Products management:
1. User requests authentication;
2. User adds a new product called Television with description and price;
3. User updates the stock for the newly created product;
4. User can see the new product available with the correspondent stock;

###### Use case 2 - Product list:
1. Client request a list of products with the quantity and price;

###### Use case 3 - Purchase request:
1. Client requests a list of products and the quantity;
2. Client sees if the purchased request was with the price description;
3. If the purchased is accepted, it is registered in the API;
4. User can see the purchase on the list;

## Requirements
- Use Laravel as a framework
- Use Angular or VueJS as a frontend framework
- Make sure the API is able to handle multiple concurrent requests;
- Submit your code in a clear GIT repo
- Create a basic CI/CD flow that runs your automated tests (phpunit).