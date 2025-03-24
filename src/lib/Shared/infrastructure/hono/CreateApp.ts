import type { Env } from "@Shared/common/Types";
import { AuthMiddleware } from "@Shared/infrastructure/hono/middleware/AuthMiddleware";
import { InjectServices } from "@Shared/infrastructure/hono/middleware/InjectServicesMiddleware";
import { NotFound } from "@Shared/infrastructure/hono/middleware/NotFound";
import { OnError } from "@Shared/infrastructure/hono/middleware/OnError";
import { Hono } from "hono";

export const createRouter = () => {
  return new Hono<Env>().basePath("/api/v1");
};

export const createApp = () => {
  const app = createRouter();

  app.notFound(NotFound);
  app.onError(OnError);

  app.use(AuthMiddleware);
  app.use("*", InjectServices);

  return app;
};
