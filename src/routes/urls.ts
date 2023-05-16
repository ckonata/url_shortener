import Router from "@koa/router";
import { getUrls } from "../services/url";

const urlRouter = new Router();

urlRouter.get("/", async (context) => {
  context.response.body = await getUrls(
    context.state.user_id,
    Number(context.request.query.limit),
    Number(context.request.query.offset)
  );
});

export { urlRouter };
