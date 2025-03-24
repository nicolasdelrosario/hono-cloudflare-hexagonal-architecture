import type { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";

export class UserGetAll {
  constructor(private readonly repository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.getAll();
  }
}
