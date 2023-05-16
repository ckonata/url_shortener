import { resolveUrl } from "./../services/url";
import Router from "@koa/router";
import { authRouter } from "./auth";
import { requireOfHandler } from "./middleware";
import { urlRouter } from "./urls";
import { visitsRouter } from "./visits";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use(
  "/urls",
  requireOfHandler,
  urlRouter.routes(),
  urlRouter.allowedMethods()
);
router.use(
  "/visits",
  requireOfHandler,
  visitsRouter.routes(),
  visitsRouter.allowedMethods()
);

router.get("/:id", async (context) => {
  const url = await resolveUrl(
    context.params.id,
    context.request.ip
  );

  context.redirect(url);
});

export default router;
