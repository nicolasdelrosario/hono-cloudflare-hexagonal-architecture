export class UserId {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  ensureIsValid() {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (this.value && !uuidPattern.test(this.value)) {
      throw new Error("Invalid UUID format");
    }
  }
}
