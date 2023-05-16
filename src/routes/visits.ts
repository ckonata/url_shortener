import Router from "@koa/router";
import { getLastVisits, getVisitsByUrl } from "../services/visits";

const visitsRouter = new Router();

visitsRouter
  .get("/", async (context) => {
    context.response.body = await getLastVisits(
      context.state.user_id,
      Number(context.query.limit),
      Number(context.query.offset)
    );
  })
  .get("/:id", async (context) => {
    context.response.body = await getVisitsByUrl(
      context.params.id,
      context.state.user_id,
      Number(context.query.limit),
      Number(context.query.offset)
    );
  });

export { visitsRouter };
