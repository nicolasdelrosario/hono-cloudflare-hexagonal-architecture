import { sign, verify } from "hono/jwt";
import { InvalidRefreshTokenError } from "@Auth/domain/exceptions/InvalidRefreshToken";

export class RefreshToken {
  constructor(
    private readonly jwtSecretKey: string,
    private readonly jwtRefreshSecretKey: string,
  ) {}

  async run(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = await verify(refreshToken, this.jwtRefreshSecretKey);
    if (!payload) throw new InvalidRefreshTokenError("Invalid refresh token.");

    const accessTokenPayload = {
      id: payload.id,
      email: payload.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };

    const refreshTokenPayload = {
      id: payload.id,
      email: payload.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    const newAccessToken = await sign(accessTokenPayload, this.jwtSecretKey);

    const newRefreshToken = await sign(
      refreshTokenPayload,
      this.jwtRefreshSecretKey,
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
