# one-spot

## Background
This project was my first attempt at web development using Express as a server framework and React Components as a building block for the front-end. This page will briefly explain the structure of the web app and the justification behind the design choices. It was built as a final project in the class CIS 197 "Javascript". 

## Running locally
If you are interested in running this app locally, follow these steps:
  - clone the repo using
  ```
  git clone https://github.com/azzamalthagafi/one-spot.git
  ```
  - Install dependencies while in the `one-spot` folder using
  ``` 
  npm install
  ```
  - make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/)
  - In a terminal session, run MongoDB using 
  ```
  mongod
  ```
  - In another terminal session, build the bundle using
  ```
  npm compile
  ```
  - Then run the server using
  ```
  npm start
  ```
  - Visit `localhost:3000`
**Note**: When run locally, data will be stored in your local instance of MongoDB. You can change the MongodbURI in the server source file to use a remote database.

## Elements of the project

#### Server
Technologies used:
  - Express: universal routing + ejs view engine
  - Socket.io: real-time event-based communication
  - React: server-side rendering and universal routing
  - MongoDB: database
  
The reason behind implementing universal routing was to simplify the structure of the app. With universal routing, all requests to the server would be handled by a single function. The function would then determine which view of the app to display and then use React to render the components into the markup string. For the view engine, I chose ejs simply because of familiarity with the syntax. Socket.io was used to implement the real-time aspect of the app. With it, multiple users can be modifying the same playlist and see each other's changes, similar to the collaborative aspect of Google Docs.

***
#### Client
  - Redux: state management
  - Socket.io
  - React
  
  In order to simplify the development of the app, Redux was used to deal with changes to the state of the app. Every action performed by the user resulted in an action being dispatched. A reducer is attached to the root React component. It deals with each action by modifying the state of the user's view and relaying necessary information to the server. When the server receives information of any modifications, it then relays the information to other clients who share the same resource.
