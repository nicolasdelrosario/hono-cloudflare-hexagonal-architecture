import { createServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type { MiddlewareHandler } from "hono";

export const InjectServices: MiddlewareHandler = async (c, next) => {
  const services = createServiceContainer(
    c.env.DB,
    c.env.JWT_SECRET_KEY,
    c.env.JWT_REFRESH_SECRET_KEY,
  );

  c.set("services", services);

  await next();
};
