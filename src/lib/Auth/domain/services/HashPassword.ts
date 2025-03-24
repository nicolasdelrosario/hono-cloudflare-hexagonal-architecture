export interface HashPassword {
  hash(plain: string): Promise<string>;

  compare(plain: string, hashed: string): Promise<boolean>;
}
