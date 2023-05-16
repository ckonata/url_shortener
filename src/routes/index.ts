import Router from "@koa/router";
import {authRouter} from "./auth";
import {urlRouter} from "./urls";
import {visitsRouter} from "./visits";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/urls", urlRouter.routes(), urlRouter.allowedMethods());
router.use("/visits", visitsRouter.routes(), visitsRouter.allowedMethods());

router.use("/urls");

router.use("/visits");

export default router;
