import { onDatabaseConnection } from "./config/knex";

onDatabaseConnection()
.then(() => { console.log('Database connection established'); })
.catch((err) => { console.error('Database connection failed', err); })

