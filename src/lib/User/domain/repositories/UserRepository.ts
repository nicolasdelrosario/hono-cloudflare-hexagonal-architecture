import type { User } from "@User/domain/models/User";
import type { UserId } from "@User/domain/value-objects/UserId";
import type { UserEmail } from "@User/domain/value-objects/UserEmail";

export interface UserRepository {
  getAll(): Promise<User[]>;

  getOneById(id: UserId): Promise<User | null>;

  getOneByEmail(email: UserEmail): Promise<User | null>;

  create(user: User): Promise<void>;

  edit(user: User): Promise<void>;

  delete(id: UserId): Promise<void>;
}
