# nestjs-prisma-api

## Description

This project was built in Typescript using [Nest](https://github.com/nestjs/nest) and [Prisma](https://github.com/prisma/prisma) frameworks.

## Running with docker-compose

### Start container

```bash
docker-compose build
docker-compose up
```

If this is your first time running the project, you will need initialize your database (after docker-compose up).

```bash
docker-compose run api pnpm run db:init
```

### Stop container
```bash
docker-compose down
```

## Running Locally

### Installing

```bash
pnpm install
```

### Initializing local database

If this is your first time running the project, you will need to bootstrap your local database.

```bash
pnpm run db:init
```

### Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Running Tests

```bash
# unit tests
$ pnpm run test
```

### Running migrations

```bash
pnpm run migrate
```

## Testing the API

## From your browser

You can access the open API documentation accessing the following links:

```bash
http://127.0.0.1:3000
http://127.0.0.1:3000/api
```

## From Command Line

### Healthcheck (public)

```bash
curl -X GET http://127.0.0.1:3000/health
```

### Signin / Signup

All other endpoints requires user identification. There are three users available and an admin. This will return a JWT token that should be used for access the other endpoints.

```bash
curl -X POST http://127.0.0.1:3000/auth/signin -H "Content-Type: application/json" -d '{"username": "admin@mydomain.com", "password": "adminpw"}'
curl -X POST http://127.0.0.1:3000/auth/signin -H "Content-Type: application/json" -d '{"username": "john@mydomain.com", "password": "userpw"}'
curl -X POST http://127.0.0.1:3000/auth/signin -H "Content-Type: application/json" -d '{"username": "chris@mydomain.com", "password": "userpw"}'
curl -X POST http://127.0.0.1:3000/auth/signin -H "Content-Type: application/json" -d '{"username": "will@mydomain.com", "password": "userpw"}'
```

It is possible also to signup, but this will only assign you a "user" profile

```bash
curl -X POST http://127.0.0.1:3000/auth/signup -H "Content-Type: application/json" -d '{"name": "Adam", "email": "adam@mydomain.com", "password": "changeme"}'
```

## Admin only endpoints
### List all users

```bash
curl -X GET http://127.0.0.1:3000/user -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN"
```

## All users endpoints
For each user, you will only see your notes. Admin can see all notes.

### List Note

```bash
curl -X GET "http://127.0.0.1:3000/note" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN"
```

### Get a Note

```bash
curl -X GET "http://127.0.0.1:3000/note/${NOTE_ID}" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN"
```


### Create a new note

```bash
curl -X POST "http://127.0.0.1:3000/note" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN"  -d '{"title": "Grocery List", "body": "Apples, potatos, Flour"}'
```

### Update a note

```bash
curl -X PUT "http://127.0.0.1:3000/note/${NOTE_ID}" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"title": "Grocery", "body": "Apples, potatos, Flour, Coffee"}'
```

### Delete a note

```bash
curl -X DELETE "http://127.0.0.1:3000/note/${NOTE_ID} -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN"
```

