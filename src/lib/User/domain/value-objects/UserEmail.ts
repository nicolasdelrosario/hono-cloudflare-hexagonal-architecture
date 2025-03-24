export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      throw new Error("Email must be a valid email address.");
  }
}
