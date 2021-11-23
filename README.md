## Description

Mono Expense Service

## Installation

```bash
$ npm install -g pnpm
```

```bash
$ pnpm install
```
## Running the app

```bash
# Copy enviroment variables
$ cp .env.example .env.development.local

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Configuration
JWT_SECRET="secret"
EXPIRES="2d"

// This project makes use of mysql
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
