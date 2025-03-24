import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserEmail } from "@User/domain/value-objects/UserEmail";

export class UserGetOneByEmail {
  constructor(private readonly repository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.repository.getOneByEmail(new UserEmail(email));

    if (!user) throw new UserNotFoundError("User not found.");

    return user;
  }
}
