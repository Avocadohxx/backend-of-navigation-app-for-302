# Campus Navigation App - NestJS Backend

A robust, scalable backend service for the Campus Navigation App, built with NestJS and TypeScript. Provides RESTful APIs for user authentication, profile management, file storage, and future integration with real-time classroom status and map services.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Prerequisites & Requirements](#2-prerequisites--requirements)
3. [Installation & Setup](#3-installation--setup)
4. [Architecture & Structure](#4-architecture--structure)
5. [API Documentation](#5-api-documentation)
6. [Database Schema](#6-database-schema)
7. [Configuration](#7-configuration)

---

## 1. Project Overview

The Campus Navigation Backend is a production-ready REST API server that powers the Flutter mobile application. It handles user authentication, profile management, file uploads to Aliyun OSS, and serves as the foundation for future real-time features including classroom status monitoring and map data services.

### Technology Stack

- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7.3
- **Runtime**: Node.js (LTS recommended)
- **Database**: PostgreSQL 8.16.3
- **ORM**: TypeORM 0.3.27
- **Authentication**: JWT (Passport.js)
- **File Storage**: Aliyun OSS 6.17.1
- **Password Hashing**: Bcrypt 6.0.0

### Key Features

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure token-based authentication with bcrypt password hashing |
| **User Management** | Complete user profile CRUD operations |
| **File Upload** | Avatar upload to Aliyun OSS with presigned URLs |
| **TypeORM Integration** | Type-safe database operations with PostgreSQL |
| **Modular Architecture** | Clean, maintainable code structure following NestJS best practices |
| **Environment Configuration** | Secure configuration management with dotenv |

---

## 2. Prerequisites & Requirements

### Required Software

1. **Node.js** (Version 18.x or higher LTS)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (Version 9.x or higher)
   - Comes with Node.js
   - Verify installation: `npm --version`

3. **PostgreSQL** (Version 14.x or higher)
   - Download: https://www.postgresql.org/download/
   - Verify installation: `psql --version`
   - Create a database for the application

4. **Aliyun OSS Account** (Optional for avatar upload)
   - Sign up at: https://www.aliyun.com/product/oss
   - Required for avatar upload functionality
   - Alternative: Comment out OSS-related code for local development

5. **Git**
   - Download: https://git-scm.com/downloads

### System Requirements

**Windows:**
- Windows 10 or later (64-bit)
- 4 GB RAM minimum
- 1 GB disk space

**macOS:**
- macOS 10.14 (Mojave) or later
- 4 GB RAM minimum
- 1 GB disk space

**Linux:**
- 64-bit distribution
- 4 GB RAM minimum
- 1 GB disk space

---

## 3. Installation & Setup

### Step 1: Clone the Repository

```bash
# Navigate to your workspace
cd C:\Users\hxx\code

# If not already cloned
git clone <repository-url> backend-of-navigation-app-for-302
cd backend-of-navigation-app-for-302
```

### Step 2: Install Dependencies

```bash
# Install all dependencies from package.json
npm install

# This will install:
# - @nestjs/* packages (core, common, platform-express, typeorm, jwt, passport, config)
# - typeorm and pg (PostgreSQL driver)
# - passport and passport-jwt (authentication)
# - bcrypt (password hashing)
# - ali-oss (Aliyun Object Storage Service)
# - dotenv (environment configuration)
# - and all dev dependencies
```

### Step 3: Database Setup

**Create PostgreSQL Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE campus_navigation;

# Create user (optional)
CREATE USER campus_admin WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE campus_navigation TO campus_admin;

# Exit
\q
```

**Database will be auto-initialized on first run thanks to TypeORM synchronization.**

### Step 4: Environment Configuration

Create a `.env` file in the project root:

```bash
# .env file
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=campus_navigation

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Aliyun OSS Configuration (Optional)
OSS_REGION=oss-cn-shanghai
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret
OSS_BUCKET=your_bucket_name

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important Security Notes:**
- Change `JWT_SECRET` to a strong, random string in production
- Never commit `.env` file to version control
- Use different credentials for development and production
- Rotate secrets regularly

### Step 5: Run the Application

**Development Mode (with hot reload):**
```bash
npm run start:dev

# Server will start at http://localhost:3000
# Swagger API documentation at http://localhost:3000/api (if configured)
```

**Production Mode:**
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

**Debug Mode:**
```bash
npm run start:debug
```

### Step 6: Verify Installation

Test the server is running:

```bash
# Test health endpoint (if configured)
curl http://localhost:3000

# Or visit in browser
# http://localhost:3000
```

### Common Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Production
npm run build              # Compile TypeScript to JavaScript
npm run start:prod         # Start compiled application

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

### Troubleshooting

**Issue: Database connection failed**
```bash
# Check PostgreSQL is running
# Windows
pg_ctl status

# Linux/macOS
pg_ctl status -D /usr/local/var/postgres

# Verify connection string in .env
# Ensure database exists
```

**Issue: Port 3000 already in use**
```bash
# Find and kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Linux/macOS
lsof -i :3000
kill -9 <process_id>

# Or change port in .env
PORT=3001
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 4. Architecture & Structure

### Project Structure

```
backend-of-navigation-app-for-302/
├── src/
│   ├── app.module.ts                 # Root application module
│   ├── app.controller.ts             # Root controller
│   ├── app.service.ts                # Root service
│   ├── main.ts                       # Application entry point
│   │
│   ├── auth/                         # Authentication module
│   │   ├── auth.module.ts           # Auth module configuration
│   │   ├── auth.controller.ts       # Auth endpoints (login, register)
│   │   ├── auth.service.ts          # Auth business logic
│   │   └── jwt.strategy.ts          # JWT passport strategy
│   │
│   ├── user/                         # User management module
│   │   ├── user.module.ts           # User module configuration
│   │   └── user.service.ts          # User CRUD operations
│   │
│   ├── database/                     # Database module
│   │   ├── database.module.ts       # TypeORM configuration
│   │   └── database.service.ts      # Database utilities
│   │
│   ├── oss/                          # Aliyun OSS module
│   │   ├── oss.module.ts            # OSS module configuration
│   │   └── oss.service.ts           # OSS upload/download logic
│   │
│   └── entities/                     # TypeORM entities
│       └── user-profile.entity.ts   # User profile database entity
│
├── test/                             # E2E tests
├── dist/                             # Compiled JavaScript (generated)
├── node_modules/                     # Dependencies (generated)
├── .env                              # Environment variables (create manually)
├── .gitignore                        # Git ignore rules
├── nest-cli.json                     # NestJS CLI configuration
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

### Architecture Pattern

The backend follows **NestJS modular architecture** with clear separation of concerns:

1. **Module Layer** (`*.module.ts`)
   - Dependency injection configuration
   - Module imports and exports
   - Provider registration

2. **Controller Layer** (`*.controller.ts`)
   - HTTP request handling
   - Route definitions
   - Request/response transformation
   - Input validation

3. **Service Layer** (`*.service.ts`)
   - Business logic implementation
   - Database interactions
   - External API calls
   - Data processing

4. **Entity Layer** (`*.entity.ts`)
   - TypeORM database models
   - Column definitions
   - Relationships
   - Database constraints

### Design Principles

- **Dependency Injection**: All dependencies injected through NestJS DI container
- **Single Responsibility**: Each module handles one domain
- **DRY (Don't Repeat Yourself)**: Shared logic in services
- **Type Safety**: Full TypeScript type checking
- **Async/Await**: Promise-based asynchronous operations
- **Error Handling**: Global exception filters (to be implemented)
- **Logging**: Structured logging (to be implemented)

### Module Dependencies

```
AppModule (Root)
├── AuthModule
│   ├── UserModule
│   ├── JwtModule
│   └── PassportModule
├── UserModule
│   └── DatabaseModule
├── DatabaseModule
│   └── TypeOrmModule
└── OssModule
    └── ConfigModule
```

---

## 5. API Documentation

### Base URL

- **Development**: `http://localhost:3000`
- **Production**: `http://your-domain.com:3000`

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "userName": "string",
  "password": "string",
  "phoneNum": "string (optional)",
  "email": "string (optional)"
}
```

**Response (201):**
```json
{
  "id": 1,
  "userName": "john_doe",
  "phoneNum": "13800138000",
  "email": "john@example.com",
  "avatarUrl": "default_avatar_url",
  "lastLoginTime": "2025-12-16T10:30:00.000Z"
}
```

**Response (400):** User already exists or validation error

---

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "userName": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userName": "john_doe",
    "phoneNum": "13800138000",
    "email": "john@example.com",
    "avatarUrl": "https://your-bucket.oss-cn-shanghai.aliyuncs.com/avatars/...",
    "lastLoginTime": "2025-12-16T10:30:00.000Z"
  }
}
```

**Response (401):** Invalid credentials

---

### Profile Endpoints

**Authentication Required:** Include `Authorization: Bearer <token>` header in all requests

#### POST /auth/update-profile
Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "userId": 1,
  "phoneNum": "13800138000",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "userName": "john_doe",
    "phoneNum": "13800138000",
    "email": "newemail@example.com",
    "avatarUrl": "https://...",
    "lastLoginTime": "2025-12-16T10:30:00.000Z"
  }
}
```

**Response (401):** Unauthorized (missing or invalid token)
**Response (404):** User not found

---

### Avatar Upload Endpoints

#### POST /auth/avatar/signature
Get presigned URL for avatar upload to Aliyun OSS.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "fileExt": "jpg"
}
```

**Response (200):**
```json
{
  "presignedUrl": "https://your-bucket.oss-cn-shanghai.aliyuncs.com/avatars/...?signature=...",
  "publicUrl": "https://your-bucket.oss-cn-shanghai.aliyuncs.com/avatars/..."
}
```

**Supported Extensions:** png, jpg, jpeg, webp

---

#### POST /auth/avatar/update
Update user's avatar URL after successful upload.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "userId": 1,
  "avatarUrl": "https://your-bucket.oss-cn-shanghai.aliyuncs.com/avatars/..."
}
```

**Response (200):**
```json
{
  "message": "Avatar updated successfully"
}
```

---

### Error Responses

All endpoints may return these error formats:

**400 Bad Request:**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

**401 Unauthorized:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

**500 Internal Server Error:**
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 6. Database Schema

### User Profile Entity

**Table Name:** `user_profile`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `userName` | Varchar(255) | UNIQUE, NOT NULL | Username for login |
| `password` | Varchar(255) | NOT NULL | Bcrypt hashed password |
| `phoneNum` | Varchar(20) | NULLABLE | Phone number |
| `email` | Varchar(255) | NULLABLE | Email address |
| `avatarUrl` | Text | NULLABLE | Avatar image URL (OSS) |
| `lastLoginTime` | Timestamp | DEFAULT NOW() | Last login timestamp |
| `createdAt` | Timestamp | DEFAULT NOW() | Record creation time |
| `updatedAt` | Timestamp | DEFAULT NOW() | Record update time |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `userName`

**Entity Definition** (`src/entities/user-profile.entity.ts`):
```typescript
@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNum?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Database Relationships

Currently a single-table schema. Future expansions may include:
- **Classroom** entity for real-time status
- **Location** entity for map data
- **UserFavorites** for saved locations
- **NavigationHistory** for usage analytics

---

## 7. Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=campus_navigation

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Aliyun OSS
OSS_REGION=oss-cn-shanghai
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret
OSS_BUCKET=your_bucket_name

# Server
PORT=3000
NODE_ENV=development
```

### TypeORM Configuration

Located in `src/database/database.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserProfile],
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === 'development',
})
```

**Important:** Set `synchronize: false` in production and use migrations instead.

### CORS Configuration

Located in `src/main.ts`:

```typescript
app.enableCors({
  origin: '*', // Configure specific origins in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

### Global Prefix

API routes are prefixed (can be configured in `src/main.ts`):

```typescript
app.setGlobalPrefix('api'); // All routes become /api/*
```

---

## Additional Information

### Security Best Practices

1. **Password Security**:
   - Passwords hashed with bcrypt (10 salt rounds)
   - Never store plain-text passwords
   - Implement password strength requirements

2. **JWT Security**:
   - Use strong, random secret keys
   - Set appropriate expiration times
   - Implement token refresh mechanism (future)
   - Store tokens securely on client

3. **Database Security**:
   - Use parameterized queries (TypeORM handles this)
   - Limit database user privileges
   - Regular backups
   - SSL connections in production

4. **Input Validation**:
   - Validate all user inputs
   - Sanitize data before database operations
   - Use NestJS validation pipes (future implementation)

5. **Environment Variables**:
   - Never commit `.env` to version control
   - Use different credentials per environment
   - Rotate secrets regularly

### Performance Optimization

1. **Database Indexing**:
   - Index on `userName` for fast login lookups
   - Add indexes for frequently queried fields

2. **Connection Pooling**:
   - TypeORM handles connection pooling automatically
   - Configure pool size based on load

3. **Caching** (Future):
   - Implement Redis for session caching
   - Cache frequently accessed data

4. **Logging**:
   - Implement structured logging
   - Use log levels appropriately
   - Avoid logging sensitive data

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

Test files are co-located with source files (`*.spec.ts`).

### Deployment

**Production Checklist:**
- [ ] Set `NODE_ENV=production`
- [ ] Set `synchronize: false` in TypeORM config
- [ ] Implement database migrations
- [ ] Configure specific CORS origins
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure database backups
- [ ] Implement rate limiting
- [ ] Add helmet for security headers
- [ ] Set up CI/CD pipeline

**Recommended Hosting:**
- AWS EC2 / ECS
- Google Cloud Platform
- Heroku
- DigitalOcean
- Alibaba Cloud

### Future Enhancements

- GraphQL API support
- Real-time WebSocket connections for classroom status
- Redis caching layer
- Admin dashboard
- API rate limiting
- Swagger/OpenAPI documentation
- Database migrations with TypeORM
- Comprehensive test coverage
- Docker containerization
- Kubernetes deployment configuration

---

## Contributing

1. Follow NestJS coding conventions
2. Write tests for new features
3. Update API documentation
4. Use meaningful commit messages
5. Never commit sensitive data

---

## Support

- NestJS Documentation: https://docs.nestjs.com
- TypeORM Documentation: https://typeorm.io
- PostgreSQL Documentation: https://www.postgresql.org/docs/

---

## License

This project is for educational purposes at Shanghai Ocean University.

---

**Last Updated**: December 2025
**NestJS Version**: 11.0.1
**Node.js Version**: 18.x LTS
**TypeScript Version**: 5.7.3
