export class UserPassword {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 6 || this.value.length > 100)
      throw new Error("Invalid password");
  }
}
