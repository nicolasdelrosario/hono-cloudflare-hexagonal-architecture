import { InvalidCredentialsError } from "@Auth/domain/exceptions/InvalidCredentialsError";
import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserEmail } from "@User/domain/value-objects/UserEmail";
import { sign } from "hono/jwt";
import type { HashPassword } from "@Auth/domain/services/HashPassword";

export class Login {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: HashPassword,
    private readonly jwtSecretKey: string,
    private readonly jwtRefreshSecretKey: string,
  ) {}

  async run(
    email: string,
    plainPassword: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.repository.getOneByEmail(new UserEmail(email));

    if (!user) throw new UserNotFoundError("User not found.");

    const isValidPassword = await this.hasher.compare(
      plainPassword,
      user.password.value,
    );

    if (!isValidPassword)
      throw new InvalidCredentialsError("Invalid credentials.");

    const accessPayload = {
      id: user.id.value,
      email: user.email.value,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };

    const refreshPayload = {
      id: user.id.value,
      email: user.email.value,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    const accessToken = await sign(accessPayload, this.jwtSecretKey);
    const refreshToken = await sign(refreshPayload, this.jwtRefreshSecretKey);

    return { accessToken, refreshToken, user };
  }
}
