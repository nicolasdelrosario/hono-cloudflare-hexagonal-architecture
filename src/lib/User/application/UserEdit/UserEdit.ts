import { UserNotFoundError } from "@User/domain/exceptions/UserNotFoundError";
import { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserEmail } from "@User/domain/value-objects/UserEmail";
import { UserId } from "@User/domain/value-objects/UserId";
import { UserName } from "@User/domain/value-objects/UserName";

export class UserEdit {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string, name: string, email: string): Promise<void> {
    const existingUser = await this.repository.getOneById(new UserId(id));
    if (!existingUser) throw new UserNotFoundError("User not found.");

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      existingUser.password,
    );

    return this.repository.edit(user);
  }
}
