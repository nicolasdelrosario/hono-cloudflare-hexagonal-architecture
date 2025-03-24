import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserId } from "@User/domain/value-objects/UserId";

export class UserDelete {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string): Promise<void> {
    const userId = new UserId(id);

    const existingUser = await this.repository.getOneById(userId);
    if (!existingUser) throw new UserNotFoundError("User not found.");

    await this.repository.delete(new UserId(id));
  }
}
