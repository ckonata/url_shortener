import { validateJwt } from "./../config/jwt";
import httpError from "http-errors";
import { RouterContext } from "@koa/router";
import { Next } from "koa";

export const requireOfHandler = async (context: RouterContext, next: Next) => {
  const header = context.request.header.authorization;
  if (!header) throw new httpError.Unauthorized("Please register and login.");

  const token = header.split(" ")[1];
  const tokenPayload = await validateJwt(token);

  context.state.user_id = tokenPayload.id;
  await next();
};
