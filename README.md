[![Build Status](https://travis-ci.org/andela-ekahindi/doc-api.svg?branch=develop)](https://travis-ci.org/andela-ekahindi/doc-api)
[![Coverage Status](https://coveralls.io/repos/github/andela-ekahindi/doc-api/badge.svg?branch=develop)](https://coveralls.io/github/andela-ekahindi/doc-api?branch=develop)
# doc-api
This is a document management API that allows users of the API to manages documents, users and user roles. Each document has access rights and Admin roles can access all documents and none admins can only access public documents. Any role can publish a document and they define whether its public. The default is private. All Users have roles defined to them. All documents also have a role defined to them. The default role assigned to the each document is the creator's role.

## Dependencies
* Mongoose​
* Node
* Postman

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**MongoDB**](https://www.mongodb.org/) .
1. Clone the [**repository here**](https://github.com/andela-ekahindi/doc-api.git) or download the zip file of the project. Unzip it.
1. [**cd**] into the root of the **doc-api project directory**.
1. Run `npm install` on the terminal.

## Tests

Run `npm test` on the terminal while within the **project root directory**.

## Usage
### Starting
In the project root, run `npm start`.
### Routes

* #### login
`http://127.0.0.1:3000/api/users/login`

* #### logout
`http://127.0.0.1:3000/api/users/logout`
* #### users

  * ##### create
  `POST`
  `http://127.0.0.1:3000/api/users`

  * ##### update
  `PUT`
  `http://127.0.0.1:3000/api/users/:id`

  * ##### delete
  `DELETE`
  `http://127.0.0.1:3000/api/users/:id`

  * ##### get one user
  `GET`
  `http://127.0.0.1:3000/api/users/:id`

  * ##### get all users
  `GET`
  `http://127.0.0.1:3000/api/users`

* #### documents

  * ##### create
  `POST`
  `http://127.0.0.1:3000/api/documents`

  * ##### update
  `PUT`
  `http://127.0.0.1:3000/api/documents/:id`

  * ##### delete
  `DELETE`
  `http://127.0.0.1:3000/api/documents/:id`

  * ##### get all documents
  `GET`
  `http://127.0.0.1:3000/api/documents`

  * ##### get a document
  `GET`
  `http://127.0.0.1:3000/api/documents/:id`

  * ##### get documets belonging to a particular user
  `GET`
  `http://127.0.0.1:3000/api/users/:id/documents`

  * ##### get documents by date
  `GET`
  `http://127.0.0.1:3000/api/documents?date=2016-`

  * #### paginate documents
  `GET`
  `http://127.0.0.1:3000/api/documents?limit=1&page=2`

* #### roles

  * ##### create
  `POST`
  `http://127.0.0.1:3000/api/roles`

  * #####  get all roles
  `GET`
  `http://127.0.0.1:3000/api/roles`

  * #####  get one roles
  `GET`
  `http://127.0.0.1:3000/api/roles/:id`

  * #####  update one roles
  `PUT`
  `http://127.0.0.1:3000/api/roles/:id`

  * #####  update one roles
  `DELETE`
  `http://127.0.0.1:3000/api/roles/:id`

*NB* getting documents by role or date routes support limits to the the number of results they return, check the `search.spec.js` file for examples.
**NB** Make sure all tests pass before testing the api with POSTman.

## Models

Three models are defined: `Roles`, `Users` and `Documents`. `Roles` must have a unique title on their creation. A `User` must have a `Role` defined for them. The routes are defined under `server/models`.

## Testing

Testing is achieved through use of `superagent`, `mocha` and `chai` packages. `superagent` is used to make requests to the api and `mocha` is the testing framework test and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

## Express Routes

Api endpoints were created using `express` router. To access them on a http client, run `node index.js` on your terminal. The routes are defined under `server/routes`.

## Mongo Database

Ensure that you have installed `mongodb` locally. Before you go ahead to run the tests or work with the api, run `mongod` on a seperate tab on your terminal. The configuration for connection to the db on mongo is defined under `server\config\index.js`. Each time tests are run or the app is run, the database is dropped and seeded.

license MIT 😄
