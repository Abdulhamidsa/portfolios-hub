# RESTful API Node Server Boilerplate / Starter Project

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, API documentation, pagination, image upload etc. For more details, check the features list below.

## Table of Contents

-   [Features](#features)
-   [Commands](#commands)
-   [Environment Variables](#environment-variables)
-   [Project Structure](#project-structure)
-   [Authentication](#authentication)
-   [Custom Mongoose Plugins](#custom-mongoose-plugins)
-   [Linting](#linting)
-   [Contributing](#contributing)

## Features

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [passport](http://www.passportjs.org)
-   **Error handling**: centralized error handling mechanism
-   **Dependency management**: with [Yarn](https://yarnpkg.com)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Santizing**: sanitize request data against xss and query injection
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
util\
 |--all files related to utility functions
```

### API Endpoints

List of available routes:

**Auth routes**:
`GET      /
    `POST /upload
`POST     /register
    `POST /login
`GET      /api/user
    `PUT /api/user
`DELETE   /api/user
    `GET /api/user/getUser/:id
`POST     /api/user/password
    `PUT /changePassword
`POST     /admin-register
    `POST /admin-login

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync')

const controller = catchAsync(async (req, res) => {
    // this error will be forwarded to the error handling middleware
    throw new Error('Something wrong happened')
})
```

The error handling middleware sends an error response, which has the following format:

```json
{
    "code": 404,
    "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')

const getUser = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
}
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const userController = require('../../controllers/user.controller')

const router = express.Router()

router.post('/users', validate(userValidation.createUser), userController.createUser)
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express')
const auth = require('../../middlewares/auth')
const userController = require('../../controllers/user.controller')

const router = express.Router()

router.post('/users', requiresLogin, userController.createUser)
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

To modify the ESLint configuration, update the `.eslintrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

-   [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
-   [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
-   [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
