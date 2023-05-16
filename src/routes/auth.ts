import Router from "@koa/router";
import { register, login } from "../services/user";

const authRouter = new Router();

authRouter
  .post("/register", async (context) => {
    context.response.body = await register(context.request.body as any);
  })
  .post("/login", async (context) => {
    context.response.body = await login(context.request.body as any);
  });

export { authRouter };
