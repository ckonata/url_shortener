import { comparePassword, hashPassword } from "./../config/encryption";
import { validateLogin, validateRegister } from "./validator";
import knex from "../config/knex";
import httpError from "http-errors";
import { generateToken } from "../config/jwt";

export const getUser = async (username: string) =>
  knex("users").whereRaw("LOWER(username) = LOWER(?)", [username]).first();

export const register = async (body: {
  username: string;
  password: string;
}) => {
  validateRegister(body);

  const current_user = await getUser(body.username);

  if (current_user) throw new httpError.Conflict("Username already exists.");

  const user = (
    await knex("users").insert(
      {
        username: body.username,
        password: await hashPassword(body.password),
      },
      ["id", "username"]
    )
  )[0];

  return user;
};

export const login = async (body: { username: string; password: string }) => {
  validateLogin(body);

  const user = await getUser(body.username);

  if (!user)
    throw new httpError.Unauthorized("Username or password are incorrect.");

  const passwordAreEquals = await comparePassword(body.password, user.password);

  if (!passwordAreEquals)
    throw new httpError.Unauthorized("Username or password are incorrect.");

  const token = await generateToken({ id: user.id });

  return {
    user: {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    token,
  };
};
