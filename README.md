# YABA - Yet Another Blog App
Another Blog App, built to learn.
Don't use it, please.

## Tech Stack

- Frontend: ReactJS, MantineUI, React Router   
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- DevOps: Docker, Docker Compose

## Getting Started
### 1. Database Setup (Docker)

Spin up the local MongoDB and Mongo Express instances using the provided Docker Compose file:

`docker-compose -f mongodb.yaml up -d`

- MongoDB connection URL: mongodb://localhost:27017/blog_db
- Mongo Express Web UI: http://localhost:8081 (Credentials: admin/pass)

### 2. Backend Setup

```
cd backend/
pnpm i

pnpm dev
```

The API will be available at http://localhost:8008.

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```
cd frontend/
pnpm i

pnpm dev
```

The application will be accessible at http://localhost:5173.
