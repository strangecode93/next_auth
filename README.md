
# NextAuth Learning Project
==========================

## Overview
------------

This project demonstrates the use of NextAuth for authentication, protected routes, and email verification and password reset using Nodemailer and Mailtrap.

## Features
------------

* User authentication using NextAuth
* Protected routes for authenticated users only
* Email verification using Nodemailer and Mailtrap
* Password reset using Nodemailer and Mailtrap

## Getting Started
-------------------

### Prerequisites

* Node.js (>= 14.17.0)
* npm (>= 6.14.13)
* Next.js (>= 11.1.0)
* NextAuth (>= 4.0.0-beta.6)
* Nodemailer (>= 6.7.0)
* Mailtrap account

### Installation

1. Clone the repository: `git clone https://github.com/your-username/nextauth-learning-project.git`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following environment variables:
	* `NEXTAUTH_URL`: your Next.js app URL
	* `MAILTRAP_USER`: your Mailtrap username
	* `MAILTRAP_PASSWORD`: your Mailtrap password
	* `MAILTRAP_HOST`: your Mailtrap host
	* `MAILTRAP_PORT`: your Mailtrap port
4. Start the development server: `npm run dev`

## Configuration
---------------

### NextAuth

* Create a `pages/api/auth` directory and add the following files:
	+ `[...nextauth].js`: NextAuth API routes
	+ `callbacks.js`: NextAuth callbacks
	+ `pages.js`: NextAuth pages
* Configure NextAuth in `next.config.js`:
```javascript
module.exports = {
  //...
  auth: {
    //...
    secret: process.env.NEXTAUTH_SECRET,
  },
}
```

### Nodemailer

* Create a `lib` directory and add a `mail.js` file:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

module.exports = transporter;
```

### Mailtrap

* Create a Mailtrap account and obtain your username, password, host, and port.
* Configure Mailtrap in your `.env` file.

## Usage
-----

### Authentication

* Register a new user: `POST /api/auth/register`
* Login an existing user: `POST /api/auth/login`
* Logout a user: `POST /api/auth/logout`

### Protected Routes

* Only authenticated users can access: `GET /protected`

### Email Verification

* Send a verification email: `POST /api/auth/send-verification-email`
* Verify an email address: `POST /api/auth/verify-email`

### Password Reset

* Send a password reset email: `POST /api/auth/send-password-reset-email`
* Reset a password: `POST /api/auth/reset-password`

## API Documentation
--------------------

* API documentation is available at `/api/docs`

## License
-------

This project is licensed under the MIT License.

## Acknowledgments
---------------

* NextAuth: <https://next-auth.js.org/>
* Nodemailer: <https://nodemailer.com/>
* Mailtrap: <https://mailtrap.io/>