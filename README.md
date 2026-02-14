# Spicy Music Backend API Documentation

## Overview
This is a comprehensive REST API built with Express.js, TypeScript, and MongoDB for managing users and music collections. The API includes authentication, validation, and full CRUD operations.

## Features Implemented

### User Management
- ✅ User registration with email and username validation
- ✅ User login with JWT authentication
- ✅ User profile management (view and update)
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication

### Music Management
- ✅ Create, read, update, delete music entries
- ✅ Fetching music statistics
- ✅ Search music by title, artist, album, or genres
- ✅ Filter music by artist, album, or genre
- ✅ Pagination support for large datasets
- ✅ Sorting capabilities

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/users/register
```
**Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

#### Login User
```
POST /api/users/login
```
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get User Profile
```
GET /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`

#### Update User Profile
```
PUT /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "email": "newemail@example.com",
  "username": "newusername"
}
```

#### Logout User
```
POST /api/users/logout
```
**Headers:** `Authorization: Bearer <token>`

### Music Endpoints

#### Create Music
```
POST /api/music
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "genres": ["Rock", "Alternative"]
}
```

#### Get All Music (with pagination, search, and filtering)
```
GET /api/music?page=1&limit=10&search=rock&artist=beatles&album=abbey&genre=rock&sortBy=createdAt&sortOrder=desc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Text search across title, artist, album
- `artist`: Filter by artist name
- `album`: Filter by album name
- `genre`: Filter by genre
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction - 'asc' or 'desc' (default: desc)

#### Get Music by ID
```
GET /api/music/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Update Music
```
PUT /api/music/:id
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "title": "Updated Title",
  "artist": "Updated Artist",
  "album": "Updated Album",
  "genres": ["Pop", "Rock"]
}
```

#### Delete Music
```
DELETE /api/music/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Search Music
```
GET /api/music/search?q=searchterm&page=1&limit=10
```
**Headers:** `Authorization: Bearer <token>`

#### Music Statistics
```
GET GET /api/music/statistics
```
**Headers:** `Authorization: Bearer <token>`

## Response Format

All API responses follow this consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid token)
- `404`: Not Found (resource doesn't exist)
- `409`: Conflict (duplicate email/username)
- `500`: Internal Server Error

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Environment Variables

Make sure to set these environment variables in your `.env` file:

```env
NODE_ENV=development
PORT=3000
MONGO_URI_LOCAL=mongodb://admin:password123@localhost:27017/spicy_music?authSource=admin
MONGO_URI_PROD=your-remote-mongodb-uri
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Running the Application

### Run with Docker Container

Start the application with Docker Compose:

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f app
```

### Run without Docker

```bash
# Install dependencies
npm install

# Start MongoDB (if not using Docker)
# Make sure MongoDB is running on localhost:27017

# Give read/write permission for uploaded files
chmod 777 uploads/

# Start development server
npm run dev

# Build TypeScript
npm run build


```

---

## Database Models

### User Model
- `email`: String (unique, required, validated)
- `username`: String (unique, required, 3-30 chars)
- `profilePic`: String (optional, stored image path)
- `password`: String (required, min 6 chars, hashed)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

### Music Model
- `title`: String (required, max 200 chars)
- `artist`: String (required, max 100 chars)
- `album`: String (required, max 100 chars)
- `albumArt`: String (required, stored image path)
- `genres`: Array of Strings (required, at least one element)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting (100 requests per 15 minutes)
- ~~CORS protection~~
- Helmet security headers

## Performance Optimizations

- Database indexing for efficient queries
- Text search indexes for music search
- Pagination for large datasets
- Optimized MongoDB queries
- Database Aggregation

## Testing the API

You can test the API using tools like **Postman**, **curl** or **Insomnia**

### Like:

```bash
# Create music (replace TOKEN with actual JWT token)
curl -X POST http://localhost:3000/api/music \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Song","artist":"Test Artist","album":"Test Album","genres":["Rock","Pop"]}'
```

---

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   ├── userController.ts    # User business logic
│   └── musicController.ts   # Music business logic
├── middleware/
│   ├── auth.ts             # JWT authentication
│   ├── upload.ts           # File upload
│   └── validation.ts       # Input validation
├── models/
│   ├── User.ts             # User Mongoose model
│   └── Music.ts            # Music Mongoose model
├── routers/
│   ├── userRouter.ts       # User routes
│   └── musicRouter.ts      # Music routes
├── types/
│   └── index.ts            # TypeScript type definitions
└── server.ts               # Express server setup
```

Implementation followed with proper authentication, validation, and a global error handling following TypeScript and Express.js best practices.

---
