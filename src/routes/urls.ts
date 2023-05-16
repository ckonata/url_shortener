import { createShortUrl, deleteUrl, updateUrls } from "./../services/url";
import Router from "@koa/router";
import { getUrls } from "../services/url";

const urlRouter = new Router();

urlRouter
  .get("/", async (context) => {
    context.response.body = await getUrls(
      context.state.user_id,
      Number(context.request.query.limit),
      Number(context.request.query.offset)
    );
  })
  .post("/", async (context) => {
    context.response.body = await createShortUrl(
      context.request.body as any,
      context.state.user_id
    );
  })
  .put("/:id", async (context) => {
    context.response.body = await updateUrls(
      context.params.id as string,
      context.request.body as any,
      context.state.user_id
    );
  })
  .delete("/:id", async (context) => {
    context.response.body = await deleteUrl(
      context.params.id,
      context.state.user_id
    );
  });

export { urlRouter };
