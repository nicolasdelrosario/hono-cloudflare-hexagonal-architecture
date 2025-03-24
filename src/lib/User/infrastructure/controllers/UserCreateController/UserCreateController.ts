import * as HttpStatusCodes from "@Shared/common/HttpStatusCodes";
import * as HttpStatusPhrases from "@Shared/common/HttpStatusPhrases";
import type { ServiceContainer } from "@Shared/infrastructure/ServiceContainer";
import type {
  Controller,
  Response,
} from "@Shared/infrastructure/controllers/Controller";
import { InvalidUserDataError } from "@User/domain/exceptions/InvalidUserDataError";
import { UserAlreadyExistsError } from "@User/domain/exceptions/UserAlreadyExistsError";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class UserCreateController implements Controller {
  async run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">> {
    try {
      const services = c.get("services") as ServiceContainer;
      const body = await c.req.json();
      const { name, email, password } = body;

      await services.user.create.run(name, email, password);

      return c.json(
        { message: HttpStatusPhrases.CREATED },
        HttpStatusCodes.CREATED,
      );
    } catch (error) {
      if (error instanceof UserAlreadyExistsError)
        return c.json({ message: error.message }, HttpStatusCodes.CONFLICT);

      if (error instanceof InvalidUserDataError)
        return c.json({ message: error.message }, HttpStatusCodes.BAD_REQUEST);

      throw error;
    }
  }
}
