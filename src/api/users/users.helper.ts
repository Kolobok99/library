import * as bcrypt from 'bcrypt';
import { UsersEntity } from "@app/api/users/users.entity";
import { UserResponseInterface } from "@app/api/users/types/user-response.interface";
import { UsersResponseInterface } from "@app/api/users/types/users-response.interface";

export class UsersHelper {

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt);
  }

  buildUserResponse(user: UsersEntity): UserResponseInterface {
    delete user.password;
    return { user };
  }

  buildUsersResponse(users: UsersEntity[]): UsersResponseInterface {
    users.map((user: UsersEntity) => {
      delete user.password;
      delete user.subscription;
    });
    return {
      users: {
        ...users,
      },
    };
  }
}