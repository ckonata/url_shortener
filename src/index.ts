import knex, { onDatabaseConnection } from "./config/knex";
import { login, register } from "./services/user";

const main = async () => {
  try {
    await onDatabaseConnection();
    console.log("Database connection established");
    //const user = await register({username: "cajulian", password: "123pass"});
    const user = await login({username: "cajulian", password: "123pass"})
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};

main();