import { InvalidCredentialsError } from "@Auth/domain/exceptions/InvalidCredentialsError";
import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { cookieOptions } from "@Shared/infrastructure/helpers/CookieOptions";
import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { Context, TypedResponse } from "hono";
import { setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class LoginController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    const services = c.get("services") as ServiceContainer;
    const { email, password } = await c.req.json();

    try {
      const { user, accessToken, refreshToken } = await services.auth.login.run(
        email,
        password,
      );

      setCookie(c, "token", accessToken, cookieOptions({ maxAge: 60 * 15 }));
      setCookie(
        c,
        "refreshToken",
        refreshToken,
        cookieOptions({ maxAge: 60 * 60 * 24 * 7 }),
      );

      return c.json(
        {
          message: HttpStatusPhrases.OK,
          user: user.toPublicJSON(),
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof UserNotFoundError)
        return c.json({ message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof InvalidCredentialsError)
        return c.json({ message: error.message }, HttpStatusCodes.UNAUTHORIZED);

      throw error;
    }
  }
}
