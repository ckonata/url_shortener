import 'dotenv/config';
import Knex from 'knex';

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  }
});

export const onDatabaseConnection = async () => knex.raw('SELECT 1+1 AS RESULT');

export default knex;