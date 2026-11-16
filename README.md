# Links Saver API

A backend application built with Laravel to help users manage and save their favorite links securely.

This project was developed as part of backend development training and includes two main tasks: Authentication API and Links Management API.

## Technologies Used

- PHP
- Laravel
- MySQL
- Laravel Sanctum
- RESTful APIs
- Postman

## Features

### Task 1: Authentication API

- User registration with name, email, and password.
- User login with email and password.
- Token-based authentication using Laravel Sanctum.
- User logout and token revocation.
- Retrieve authenticated user information.
- Input validation and secure password hashing.

### Task 2: Links API

- Create a new link with title, URL, and category.
- Retrieve the authenticated user's links.
- Update an existing link.
- Delete a link.
- Filter links by category.
- Validate required fields and URL format.
- Restrict access so users can manage their own links only.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BashayerAlharbi/links_saver_auth_api
```

### 2. Navigate to the Project Directory

```bash
cd links_saver_auth_api
```

### 3. Install Dependencies

```bash
composer install
```

### 4. Configure Environment

Copy the example environment file:

```bash
copy .env.example .env
```

Configure your database settings in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=links_saver
DB_USERNAME=root
DB_PASSWORD=
```

Make sure the `links_saver` database has been created in MySQL.

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Run Database Migrations

```bash
php artisan migrate
```

### 7. Start the Development Server

```bash
php artisan serve
```

The application will be available at:

`http://127.0.0.1:8000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/register` | Register a new user | Not Required |
| POST | `/api/login` | Login and receive an access token | Not Required |
| POST | `/api/logout` | Logout and revoke the current token | Required |
| GET | `/api/user` | Retrieve authenticated user details | Required |

### Links Management

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/links` | Create a new link | Required |
| GET | `/api/links` | Retrieve user's links | Required |
| GET | `/api/links?category=Programming` | Filter links by category | Required |
| PUT | `/api/links/{id}` | Update a link | Required |
| DELETE | `/api/links/{id}` | Delete a link | Required |

## Authentication

This project uses Laravel Sanctum for API token authentication.

For protected endpoints, include the following headers:

```http
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

## Data Access Control

Each link is associated with its owner through a user relationship.

The application checks link ownership before allowing users to update or delete links. This ensures that users can only access and manage their own links.

## API Testing

The API endpoints were tested using Postman, including:

- User registration and login.
- Authenticated user retrieval and logout.
- Creating, retrieving, updating, and deleting links.
- Filtering links by category.
- Validation errors and unauthorized requests.
- Checking that users cannot access or modify other users' links.

## Security

- Passwords are securely hashed.
- Protected endpoints require valid authentication tokens.
- Input validation is applied to incoming requests.
- User-based access control protects link ownership.
- Environment variables are excluded from version control.

---

Developed as part of backend development training.