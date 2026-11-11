Links Saver – Authentication API

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-Framework-red?logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/PHP-Backend-blue?logo=php" alt="PHP">
  <img src="https://img.shields.io/badge/MySQL-Database-blue?logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Authentication-Laravel%20Sanctum-green" alt="Sanctum">
</p>

About the Project

Links Saver is a backend application developed as part of Task 1 during my backend development training.

This task focuses on building a secure authentication API using Laravel, allowing users to register, log in, log out, and retrieve their authenticated account information.

Technologies Used

* PHP
* Laravel
* MySQL
* Laravel Sanctum
* RESTful APIs
* Postman

Features

* User Registration with name, email, and password.
* User Login with email and password.
* Token-based authentication using Laravel Sanctum.
* User Logout and token revocation.
* Retrieve authenticated user information.
* Input validation and error handling.
* Secure password hashing.
* Protected API endpoints.

Project Setup

1. Clone the Repository

git clone YOUR_REPOSITORY_URL

2. Navigate to the Project

cd links-saver-auth-api

3. Install Dependencies

composer install

4. Configure Environment

Copy the example environment file:

cp .env.example .env

Update your database configuration in .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=links_saver
DB_USERNAME=root
DB_PASSWORD=

5. Generate Application Key

php artisan key:generate

6. Run Database Migrations

php artisan migrate

7. Start the Development Server

php artisan serve

The application will be available at:

http://127.0.0.1:8000

API Endpoints

Method	Endpoint	Description	Authentication
POST	/api/register	Register a new user	Not Required
POST	/api/login	Authenticate user and return token	Not Required
POST	/api/logout	Log out and revoke current token	Required
GET	/api/user	Retrieve authenticated user details	Required

Authentication

This project uses Laravel Sanctum for API token authentication.

For protected endpoints, include the following headers:

Authorization: Bearer YOUR_TOKEN
Accept: application/json

API Testing

The API endpoints were tested using Postman, including:

* Successful registration and login.
* Retrieving authenticated user information.
* Successful logout.
* Invalid login credentials.
* Validation errors.
* Unauthorized access without a valid token.

The Postman Collection is included in the repository under the postman directory.

Security

* Passwords are hashed before being stored in the database.
* Protected endpoints require valid authentication tokens.
* Input validation is applied to incoming requests.
* Sensitive environment variables are excluded from version control.

Project Scope

This repository covers Task 1: Authentication API of the Links Saver application.

Developed as part of backend development training.