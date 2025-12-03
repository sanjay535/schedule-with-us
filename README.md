# Schedule With Us — Full Stack App

A mock interview scheduling platform with:
- Interviewer availability management
- Candidate interview booking
- Practice questions fetched from GitHub
- Next.js frontend + Node.js backend
- Prisma ORM + SQLite

---

## 🚀 Setup

### 1. Clone the repo
```bash
git clone https://github.com/sanjay535/schedule-with-us.git
```

## 🛠️ Generate Prisma Schema and Run Backend

### 1. Generate Prisma Client
To generate the Prisma client, run the following command in the `backend` directory:
```bash
npx prisma generate
```

### 2. Apply Database Migrations
To apply the database migrations, run:
```bash
npx prisma migrate dev
```

### 3. Start the Backend Server
To start the backend server, use the following command:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

## 🔑 Basic Login/Register API for Postman Testing

### 1. Register API
- **Endpoint**: `POST /register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
      "name": "Test User",
      "emailId": "user@example.com",
      "password": "password123",
      "role": "USER", // ADMIN, INTERVIEWER
      "dob": "2000-01-01"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "user": {
          "id": 1,
          "name": "Test User",
          "emailId": "user@example.com",
          "role": "candidate",
          "dob": "2000-01-01T00:00:00.000Z"
      }
  }
  ```

### 2. Login API
- **Endpoint**: `POST /login`
- **Description**: Login with email and password.
- **Request Body**:
  ```json
  {
      "emailId": "user@example.com",
      "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "token": "<JWT_TOKEN>"
  }
  ```

Use these APIs to test the authentication functionality in Postman.

## Design idea
 - [Figma desgin 1](https://www.figma.com/design/IKbfsvISqRXkDxmSu4oetC/Recruitment-Portal--Community-?node-id=0-1&p=f&t=PMmOFbK6RV5Y1fGj-0)
- [Figma desgin 2](https://www.figma.com/community/file/1552262349953288359/teamhub-hr-team-management-admin-dashboard-ui-design)