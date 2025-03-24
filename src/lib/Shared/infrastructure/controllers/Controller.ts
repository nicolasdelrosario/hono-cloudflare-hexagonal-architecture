import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export interface Response {
  message?: string;
  [key: string]: any;
}

export interface Controller {
  run(
    c: Context,
  ): Promise<Response & TypedResponse<Response, StatusCode, "json">>;
}
