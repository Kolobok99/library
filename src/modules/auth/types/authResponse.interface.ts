import { userType } from '@app/users/types/user.type';

export interface AuthResponseInterface {
  user: userType & { token: string };
}
