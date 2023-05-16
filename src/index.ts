import { onDatabaseConnection } from "./config/knex";
import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import router from "./routes/index";

const app = new Koa();
app.use(cors());
app.use(helmet());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());


const main = async () => {
  try {
    await onDatabaseConnection();

    var port = process.env.PORT;

    app.listen(Number(port), () => {
      console.log(`Server started in port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
