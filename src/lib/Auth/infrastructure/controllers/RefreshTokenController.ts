import { InvalidRefreshTokenError } from "@Auth/domain/exceptions/InvalidRefreshToken";
import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { cookieOptions } from "@Shared/infrastructure/helpers/CookieOptions";
import type { Context, TypedResponse } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class RefreshTokenController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    const services = c.get("services") as ServiceContainer;
    const refreshToken = getCookie(c, "refreshToken");

    if (!refreshToken)
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED,
      );

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await services.auth.refreshToken.run(refreshToken);

      setCookie(c, "token", accessToken, cookieOptions({ maxAge: 60 * 15 }));
      setCookie(
        c,
        "refreshToken",
        newRefreshToken,
        cookieOptions({ maxAge: 60 * 60 * 24 * 7 }),
      );

      return c.json({ message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof InvalidRefreshTokenError) {
        return c.json({ message: error.message }, HttpStatusCodes.UNAUTHORIZED);
      }

      throw error;
    }
  }
}
