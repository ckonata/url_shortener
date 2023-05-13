import 'dotenv/config';
import Knex from 'knex';

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  }
});

export const onDatabaseConnection = async () => knex.raw('SELECT 1+1 AS RESULT');

export default knex;