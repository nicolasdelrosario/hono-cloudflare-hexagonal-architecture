import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserId } from "@User/domain/value-objects/UserId";

export class UserGetCurrent {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string) {
    const user = await this.repository.getOneById(new UserId(id));

    if (!user) throw new UserNotFoundError("User not found.");

    return user.toPublicJSON();
  }
}
