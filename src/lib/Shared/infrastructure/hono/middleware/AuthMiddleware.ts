import { InvalidCredentialsError } from "@Auth/domain/exceptions/InvalidCredentialsError";
import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { Env } from "@Shared/common/Types";
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

// Change this if you want to add more public paths or remove some.
const publicPaths = ["/api/v1/login", "/api/v1/users"];

export const AuthMiddleware = async (c: Context<Env>, next: Next) => {
  const path = c.req.path;

  if (publicPaths.includes(path)) return await next();

  const cookieToken = getCookie(c, "token");
  const authHeader = c.req.header("Authorization");

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : cookieToken;

  if (!token)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );

  try {
    const payload = await verify(token, c.env.JWT_SECRET_KEY);

    if (!payload) throw new Error("Invalid token payload.");

    c.set("jwtPayload", payload);

    return await next();
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return c.json({ message: error.message }, HttpStatusCodes.UNAUTHORIZED);

    throw error;
  }
};
