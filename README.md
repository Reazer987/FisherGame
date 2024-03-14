
# Fisher Game

Welcome to Fisher Game! This application allows users to login, register, logout, and manage fishing catches. Users can view all catches, update their own catches, delete their own catches, and add new catches.


## Features

Login User
- The Login page contains a form for existing user authentication. Users can log in with their username and password.
- After a successful login, the home page is displayed.
- If there's an error during login, an appropriate error message is displayed, allowing users to attempt login again.
- User data is stored in the browser's session or local storage.
Endpoint: GET http://localhost:3030/users/login

Register User
- Users can register a new account with their email and password.
 - If there's an error during registration (e.g., invalid username/password), an appropriate error message is displayed, allowing users to try registering again.
 - After successful registration, the home page is displayed.
- User data is stored in the browser's session or local storage.
Endpoint: POST http://localhost:3030/users/register

Logout
- Logged-in users can perform a logout action.
- Sending a GET request to http://localhost:3030/users/logout clears any session information stored in browser storage.
- Upon successful logout, the user is redirected to the Home page, and the navigation button is updated.

Load Catches
- Pressing the "LOAD" button lists all catches for all users.
- Pressing the "Update" button sends a PUT request to update the catch (only available for the creator of the catch).
- Pressing the "Delete" button deletes the catch (only available for the creator of the catch).
- Pressing the "Add" button submits a new catch with the input values in the form.
- The "Add" button is disabled if no user is logged in.
- The "Update" and "Delete" buttons are disabled if the currently logged-in user is not - the author of the catch.
Each catch includes:
- Angler name
- Weight of the fish
- Fish species
- Location where the fish was caught
- Bait used
- Time needed to catch the fish (in minutes)
Requests to access data:
- List All Catches: GET http://localhost:3030/data/catches
- Create a New Catch: POST http://localhost:3030/data/catches
- Update a Catch: PUT http://localhost:3030/data/catches/:catchId
- Delete a Catch: DELETE http://localhost:3030/data/catches/:catchId
## Installation

To use Fisher Game:

Start the server.
```bash
  cd server
  node .\server.js
```
- Open the application in your web browser.
- Login or register as a new user.
- Explore the features such as loading, updating, adding, and deleting catches.
- Logout when finished.
Enjoy fishing with Fisher Game! 🎣


    