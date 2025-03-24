import { User } from "@User/domain/models/User";
import type { UserRepository } from "@User/domain/repositories/UserRepository";
import { UserEmail } from "@User/domain/value-objects/UserEmail";
import { UserId } from "@User/domain/value-objects/UserId";
import { UserName } from "@User/domain/value-objects/UserName";
import { UserPassword } from "@User/domain/value-objects/UserPassword";
import type { SQLiteUser } from "@User/infrastructure/schemas/UserSchema";

export class SQLiteUserRepository implements UserRepository {
  constructor(private readonly db: D1Database) {}

  async getAll(): Promise<User[]> {
    const { results } = await this.db
      .prepare("SELECT * FROM users")
      .all<SQLiteUser>();

    return results.map((row) => this.mapToDomain(row));
  }

  async getOneById(id: UserId): Promise<User | null> {
    const row = await this.db
      .prepare("SELECT * FROM users WHERE id = ?")
      .bind(id.value)
      .first<SQLiteUser>();

    if (!row) return null;

    return this.mapToDomain(row);
  }

  async getOneByEmail(email: UserEmail): Promise<User | null> {
    const row = await this.db
      .prepare("SELECT * FROM users WHERE email = ?")
      .bind(email.value)
      .first<SQLiteUser>();

    if (!row) return null;

    return this.mapToDomain(row);
  }

  async create(user: User): Promise<void> {
    await this.db
      .prepare(
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      )
      .bind(
        user.id.value,
        user.name.value,
        user.email.value,
        user.password.value,
      )
      .run();
  }

  async edit(user: User): Promise<void> {
    await this.db
      .prepare(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      )
      .bind(
        user.name.value,
        user.email.value,
        user.password.value,
        user.id.value,
      )
      .run();
  }

  async delete(id: UserId): Promise<void> {
    await this.db
      .prepare("DELETE FROM users WHERE id = ?")
      .bind(id.value)
      .run();
  }

  private mapToDomain(row: SQLiteUser): User {
    return new User(
      new UserId(row.id),
      new UserName(row.name),
      new UserEmail(row.email),
      new UserPassword(row.password),
    );
  }
}
