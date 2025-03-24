export class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 3 || this.value.length > 100)
      throw new Error("Invalid user name");
  }
}
