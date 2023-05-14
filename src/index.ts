import knex, { onDatabaseConnection } from "./config/knex";
import { register } from "./services/user";

const main = async () => {
  try {
    await onDatabaseConnection();
    console.log("Database connection established");

    //const users = await knex('users').select('username').first();

    // const urls = await knex("urls").insert({
    //  url: "www.facebook.com",
    //  user_id: 1,
    // }, "*")

    const user = await register({username: "julian", password: "pass123"});
    console.log(user)
  } catch (err) {
    console.log(err);
  }
};

main();