# Server for Dragisagram

This is the server-side application for the Instagram replica. The server uses Node.js and Express to handle API requests and integrates with MongoDB for data storage. It includes various dependencies to support authentication, real-time communication, and other functionalities. This README will guide you through setting up and running the server on your local machine.

# Table of Contents

Installation
Usage
Scripts
Dependencies
Installation
To get started with the server application, you'll need to have Node.js and npm (Node Package Manager) installed on your machine.

Install the dependencies: npm install
Usage
After installing the dependencies, you can run the server locally using the following command: npm start

# This will start the server with nodemon, which automatically restarts the server whenever file changes in the directory are detected.

# Scripts

In the project directory, you can run the following scripts:

npm start: Starts the server with nodemon, which automatically restarts the server on file changes.

# Dependencies

Here is a list of the main dependencies used in the server project along with their purposes:

bcrypt: Library for hashing passwords.
cors: Middleware for enabling Cross-Origin Resource Sharing.
dotenv: Module for loading environment variables from a .env file.
express: Web framework for Node.js to handle API requests.
jsonwebtoken: Library for generating and verifying JSON Web Tokens.
mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
nodemailer: Module for sending emails.
nodemon: Tool that helps develop node.js based applications by automatically restarting the node application when file changes are detected.
socket.io: Library for real-time web socket communication.
swagger-jsdoc: Library for generating Swagger API documentation.
swagger-ui-express: Middleware to serve auto-generated Swagger API documentation.
textflow.js: Library for text manipulation.

## Feel free to contribute to the project by opening issues and submitting pull requests.
