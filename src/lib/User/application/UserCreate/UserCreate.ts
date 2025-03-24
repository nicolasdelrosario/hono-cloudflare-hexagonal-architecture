import type { HashPassword } from "@Auth/domain/services/HashPassword";
import { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserEmail } from "@User/domain/value-objects/UserEmail";
import { UserId } from "@User/domain/value-objects/UserId";
import { UserName } from "@User/domain/value-objects/UserName";
import { UserPassword } from "@User/domain/value-objects/UserPassword";
import { v4 as uuidv4 } from "uuid";

export class UserCreate {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: HashPassword,
  ) {}

  async run(name: string, email: string, password: string): Promise<void> {
    const id = uuidv4();
    const hashedPassword = await this.hasher.hash(password);

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(hashedPassword),
    );

    await this.repository.create(user);
  }
}
