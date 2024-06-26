# Courses online

This project is a web application for viewing and purchasing Courses online. Users can view Courses online, enter their email to receive a video directly via email, and manage their Courses.

## Features

- View product details including description, price, and video.
- Enter email to receive the course video directly via email.
- Manage shopping cart with add/remove functionality.
- Authentication for secure access to products.

## Prerequisites

- Node.js
- npm
- Python
- Django

## Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Django server:
    ```bash
    python manage.py runserver
    ```

## Configuration

### Django

1. Set up the database:
    ```bash
    python manage.py migrate
    ```

2. User name : dan
pass - 123

3. Update `settings.py` for CORS and JWT:
    ```python
    INSTALLED_APPS = [
        ...
        'corsheaders',
        'rest_framework',
        'rest_framework_simplejwt.token_blacklist',
    ]

    MIDDLEWARE = [
        ...
        'corsheaders.middleware.CorsMiddleware',
    ]

    CORS_ALLOWED_ORIGINS = [
        'http://localhost:3000',
    ]

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ),
    }

    SIMPLE_JWT = {
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    }
    ```

### Frontend

Update the API base URL in your frontend application if necessary. Ensure that the frontend is making requests to the correct backend URL.

## Usage

1. Run the frontend and backend servers.
2. Navigate to `http://localhost:3000` to view the application.
3. Log in or create an account to view products.
4. On the product page, enter your email to receive the course video directly via email.

## API Endpoints

### Authentication

- `POST /api/token/`: Obtain JWT token.
- `POST /api/token/refresh/`: Refresh JWT token.

### Products

- `GET /api/product/<id>/`: Retrieve product details.
- `POST /api/send-video/`: Send product video to email.

## Notes

- Ensure that the backend server is running before attempting to access the frontend.
- Use the Django admin panel to manage products and users.
