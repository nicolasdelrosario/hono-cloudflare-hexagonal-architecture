export type Bindings = {
  DB: D1Database;
  JWT_SECRET_KEY: string;
  JWT_REFRESH_SECRET_KEY: string;
  ENV: string;
};

export type Env = {
  Bindings: Bindings;
};
