import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { clearCookieOptions } from "@Shared/infrastructure/helpers/CookieOptions";
import type { Context, TypedResponse } from "hono";
import { setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class LogoutController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    setCookie(c, "token", "", clearCookieOptions());
    setCookie(c, "refreshToken", "", clearCookieOptions());

    return c.json({ message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
  }
}
