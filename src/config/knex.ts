import Knex from 'knex';

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'url_shortener',
  }
});

export const onDatabaseConnection = async () => knex.raw('SELECT 1+1 AS RESULT');

export default knex;