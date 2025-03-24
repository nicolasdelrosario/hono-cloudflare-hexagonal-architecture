import type { HashPassword } from "@Auth/domain/service/HashPassword";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements HashPassword {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
