import type { UserEmail } from "@User/domain/value-objects/UserEmail";
import type { UserId } from "@User/domain/value-objects/UserId";
import type { UserName } from "@User/domain/value-objects/UserName";
import type { UserPassword } from "@User/domain/value-objects/UserPassword";

export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  public toPublicJSON() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }
}
