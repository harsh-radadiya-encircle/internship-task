# Blogging API Testing Guide

This guide details all available API endpoints and explains how to test them using Postman.

## Getting Started

1. **Start the API Server**:
   Make sure you run the server locally:
   ```bash
   npm run dev
   ```
   *The server runs at `http://localhost:5000`.*

2. **Import Postman Collection**:
   - Open Postman.
   - Click the **Import** button in the top-left.
   - Select the file [Blogging_API.postman_collection.json](file:///d:/internship-task/Database-Integration-and-Authentication/Blogging_API.postman_collection.json) in this directory.
   - Click **Import**.

---

## API Endpoints List

### 1. Authentication Endpoints

#### **Register a New User**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
  ```json
  {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
  }
  ```
- **Validation Rules**:
  - `name`: Must be at least 3 characters.
  - `email`: Must be a valid email format.
  - `password`: Must be at least 6 characters.

#### **Login User**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
  ```json
  {
      "email": "johndoe@example.com",
      "password": "password123"
  }
  ```
- **Notes**: In the imported Postman collection, a Test Script runs on this request to automatically extract the returned JWT token and store it as a collection variable (`token`). Subsequent requests will use this token automatically!

---

### 2. Blogging Endpoints

#### **Create a Blog**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/blogs`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_jwt_token>` (automatically handles `{{token}}` variable in Postman)
- **Body (JSON)**:
  ```json
  {
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post. It must be at least 10 characters long."
  }
  ```
- **Validation Rules**:
  - `title`: Must be at least 3 characters.
  - `content`: Must be at least 10 characters.

#### **Get All Blogs**
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/blogs`
- **Access**: Public (No token needed)

#### **Get Blog by ID**
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/blogs/:id`
- **Access**: Public (No token needed)
- **Params**: Replace `:id` with the blog ID string returned from the "Create Blog" response (e.g. `64a2f8b5f3a09e001c...`).

#### **Update Blog**
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/blogs/:id`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_jwt_token>`
- **Params**: Replace `:id` with the target blog ID.
- **Body (JSON)**:
  ```json
  {
      "title": "An Updated Title",
      "content": "An updated body content that is at least 10 characters long."
  }
  ```
- **Authorization**: Only the user who created the blog post (author) can update it. Mismatched authors will receive a `403 Forbidden` response.

#### **Delete Blog**
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/blogs/:id`
- **Headers**:
  - `Authorization: Bearer <your_jwt_token>`
- **Params**: Replace `:id` with the target blog ID.
- **Authorization**: Only the user who created the blog post (author) can delete it. Mismatched authors will receive a `403 Forbidden` response.

---

## Step-by-Step Test Sequence in Postman

1. **Run `POST Register User`** to create a test user accounts.
2. **Run `POST Login User`**. This request contains an automatic test script that sets the `token` variable.
3. **Run `POST Create Blog`** to publish your first post. Copy the `_id` field returned in the JSON response.
4. **Run `GET Get All Blogs`** to verify that your post shows up and the author field correctly populates the author's name and email.
5. **Run `GET Get Blog By ID`** (replacing the ID in the path with your copied blog ID) to verify it retrieves the correct individual blog post.
6. **Run `PUT Update Blog`** (replacing the ID in the path) to modify your post content.
7. **Run `DELETE Delete Blog`** (replacing the ID in the path) to clean up and delete the post.
8. **Run `GET Get Blog By ID`** again on the same ID to verify it returns `404 Not Found`.
