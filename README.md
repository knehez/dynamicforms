# Angular 7 - Dynamic Reactive Forms directly from TypeORM models

This project demonstartes how to generate Angular7+ dynamic reactive forms and CRUD tables, directly from [typeORM](http://typeorm.io) models.

## Creates tables and reactive forms for data handing
![diagram](images/main.png)

## Automatic ER diagram
![diagram](images/erd.png)

## Prerequistences

- mySQL server

## Installation steps

- clone repository
- ``npm install``
- Check ormconfig.json and set your DB connections details
- Run db migration ``npm run migration``
- start client: ``npm run start``
- start backend: ``npm run gulp backend``

## Database migration scripts
- Generate new migration: ``npm run generate-migration -- -n <migration_name>``
- Run migrations: ``npm run migration``
- Revert the last migration: ``npm run revert-migration``