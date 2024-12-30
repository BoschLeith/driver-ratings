# Project Setup

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Development

To start the development server, use:

```bash
npm run dev
```

Then, open your browser and navigate to:

```
http://localhost:3000
```

## Starting the Local libSQL Server

To start a local libSQL server and create a database, run:

```bash
turso dev
```

You can connect to the database using the following code in your SDK:

```javascript
import { createClient } from "@libsql/client";

const client = createClient({
  url: "http://127.0.0.1:8080",
});
```

## Database Migrations

### Creating a New Migration

To create a new migration, use:

```bash
DATABASE_URL="http://127.0.0.1:8080" geni new migration_name
```

### Running Migrations

To apply the migrations, run:

```bash
DATABASE_URL="http://127.0.0.1:8080" geni up
```

### Rolling Back Migrations

To rollback the last migration, use:

```bash
DATABASE_URL="http://127.0.0.1:8080" geni down
```