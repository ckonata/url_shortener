import knex, { onDatabaseConnection } from "./config/knex";

const main = async () => {
 try{
  await onDatabaseConnection();
  console.log('Database connection established');

  //const users = await knex('users').select('username').first();

  // const urls = await knex("urls").insert({
  //  url: "www.facebook.com",
  //  user_id: 1,
  // }, "*")

  const urls = await knex("urls").select("*");
  console.log(urls);
 }catch(err){
  console.log(err);
 }
}

main();
