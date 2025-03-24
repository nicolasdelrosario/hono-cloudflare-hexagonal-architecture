type Params = {
  maxAge: number;
};

export const cookieOptions = ({ maxAge }: Params) => ({
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "Lax" as const,
  maxAge,
});

export const clearCookieOptions = () => cookieOptions({ maxAge: 0 });
