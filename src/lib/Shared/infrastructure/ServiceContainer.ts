import { Login } from "@Auth/application/Login/Login";
import { RefreshToken } from "@Auth/application/RefreshToken/RefreshToken";
import { BcryptPasswordHasher } from "@Auth/infrastructure/hash/BcryptPasswordHasher";
import { UserCreate } from "@User/application/UserCreate/UserCreate";
import { UserDelete } from "@User/application/UserDelete/UserDelete";
import { UserEdit } from "@User/application/UserEdit/UserEdit";
import { UserGetAll } from "@User/application/UserGetAll/UserGetAll";
import { UserGetCurrent } from "@User/application/UserGetCurrent/UserGetCurrent";
import { UserGetOneByEmail } from "@User/application/UserGetOneByEmail/UserGetOneByEmail";
import { UserGetOneById } from "@User/application/UserGetOneById/UserGetOneById";
import { SQLiteUserRepository } from "@User/infrastructure/repositories/SQLiteUserRepository";
import type { D1Database } from "@cloudflare/workers-types";

export const createServiceContainer = (
  db: D1Database,
  jwtSecretKey: string,
  jwtRefreshSecretKey: string,
) => {
  const userRepository = new SQLiteUserRepository(db);
  const passwordHasher = new BcryptPasswordHasher();

  return {
    user: {
      getAll: new UserGetAll(userRepository),
      getOneById: new UserGetOneById(userRepository),
      getOneByEmail: new UserGetOneByEmail(userRepository),
      getCurrentUser: new UserGetCurrent(userRepository),
      edit: new UserEdit(userRepository),
      create: new UserCreate(userRepository, passwordHasher),
      delete: new UserDelete(userRepository),
    },
    auth: {
      login: new Login(
        userRepository,
        passwordHasher,
        jwtSecretKey,
        jwtRefreshSecretKey,
      ),
      refreshToken: new RefreshToken(jwtSecretKey, jwtRefreshSecretKey),
    },
  };
};

export type ServiceContainer = ReturnType<typeof createServiceContainer>;
