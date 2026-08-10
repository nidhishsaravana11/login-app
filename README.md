Login Application
A full-stack login/registration app:
Backend: Spring Boot 3 (Java 17), Spring Security, JWT auth, JPA/Hibernate, MySQL (Postgres-ready)
Frontend: React 18, React Router, Axios
---
Project structure
```
login-app/
├── backend/     Spring Boot API (port 8080)
└── frontend/    React app (port 3000)
```
---
1. Backend setup
Requirements
Java 17+
Maven 3.8+
MySQL 8+ (or Postgres — see notes below)
Configure the database
Create the database (or let Hibernate auto-create it):
```sql
   CREATE DATABASE login_app_db;
   ```
Open `backend/src/main/resources/application.properties` and set your DB
username/password.
Change `app.jwt.secret` to a long random string before deploying anywhere real.
Switch to Postgres (optional)
In `backend/pom.xml`, comment out the `mysql-connector-j` dependency and
uncomment the `postgresql` dependency block.
In `application.properties`, comment out the MySQL lines and uncomment the
Postgres lines (also uncomment `spring.jpa.database-platform`).
Run it
```bash
cd backend
mvn spring-boot:run
```
API will be available at `http://localhost:8080`.
Endpoints
Method	Endpoint	Auth required	Description
POST	`/api/auth/register`	No	Create a new account
POST	`/api/auth/login`	No	Log in, returns JWT
GET	`/api/users/me`	Yes (Bearer)	Get current user profile
Register / Login request body:
```json
{ "fullName": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```
```json
{ "email": "jane@example.com", "password": "secret123" }
```
Response (both endpoints):
```json
{
  "token": "eyJhbGciOi...",
  "tokenType": "Bearer",
  "userId": 1,
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "role": "USER"
}
```
Send the token on subsequent requests as:
```
Authorization: Bearer <token>
```
---
2. Frontend setup
Requirements
Node.js 18+
Run it
```bash
cd frontend
npm install
npm start
```
App will open at `http://localhost:3000`.
It talks to the backend at `http://localhost:8080/api` (see `src/api.js` if
you need to change this, e.g. for deployment).
Pages
`/login` — sign in
`/register` — create an account
`/dashboard` — protected page, redirects to `/login` if not authenticated
---
Security notes for production
Replace `app.jwt.secret` with a securely generated secret (never commit real secrets).
Set `spring.jpa.hibernate.ddl-auto` to `validate` and use a migration tool
(Flyway/Liquibase) instead of `update`.
Restrict CORS `allowedOrigins` in `SecurityConfig` to your real frontend domain.
Serve everything over HTTPS.
Consider shorter JWT expiry + refresh tokens for a production-grade app.
