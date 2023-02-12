import { UsersEntity } from '../users.entity';

export type userType = Omit<UsersEntity, 'hashPassword'>;
