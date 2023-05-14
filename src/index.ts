import knex, { onDatabaseConnection } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnection();
    console.log("Database connection established");

  } catch (err) {
    console.log(err);
  }
};

main();