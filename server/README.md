## Starting the Local libSQL Server

To start a local libSQL server and create a database, run:

```bash
turso dev
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
