# Guestara Internship Assignment 

This is my submission for the internship assignment given by Guestara - [Link](https://docs.google.com/document/d/1TAftxo1HQwMBHf-KwLM-6_-haet7HNUNHvtkVtxYVjs/edit)
Done by - Mukundh P L

## Routes

###  / (GET request)
- Test route to check if server if working

### /category
- ### / (GET request) :
    - Gets all categories in database
- ### /id/:id (GET request): 
    - Gets the category with id passed in place of :id
- ### /name/:name (GET request): 
    - Gets all categories with name passed in place of :name 
- ### / (POST request) :
    - Creates a category and stores in database
- ### / (PUT request) :
    - Updates a category present in database with parameters passed in request body

### /subcategory
- ### / (GET request) :
    - Gets all subcategories in database
- ### /id/:id (GET request): 
    - Gets the subcategory with id passed in place of :id
- ### /name/:name (GET request): 
    - Gets all subcategories with name passed in place of :name 
- ### /category/:category_id (GET request): 
    - Gets all subcategories under a category with id passed in place of :category_id
- ### / (POST request) :
    - Creates a subcategory with parameters passed in request body and stores in database 
- ### / (PUT request) :
    - Updates a subcategory present in database with parameters passed in request body

### /item
- ### / (GET request) :
    - Gets all items in database
- ### /id/:id (GET request): 
    - Gets the item with id passed in place of :id
- ### /name/:name (GET request): 
    - Gets all items with name passed in place of :name 
- ### /category/:category_id (GET request): 
    - Gets all items under a category with id passed in place of :category_id
- ### /subcategory/:subcategory_id (GET request): 
    - Gets all items under a subcategory with id passed in place of :subcategory_id
- ### / (POST request) :
    - Creates a item with parameters passed in request body and stores in database 
- ### / (PUT request) :
    - Updates a item present in database with parameters passed in request body 


## Setup


- Run "npm i" to install required node_modules 
- Make sure you have a PostgreSQL instance and pass the required credentials in .env file
- Run "npm run start" to  start the server
- Server will run in by default [http://localhost:3500](http://localhost:3500), can be changed by setting the PORT in the .env file
- Note: You might find it easier to do DML operations using drizzle-kit studio with its nice UI interface. To use it run "npm run studio" and go to [https://local.drizzle.studio](https://local.drizzle.studio)


### Video
- [Link](https://www.loom.com/share/2bc7143de80c4538b532c68acb6ce4cf?sid=b9b7a756-7e66-47e6-bd1b-5579230bbe19)
