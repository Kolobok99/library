import { RolesEntity } from "@app/api/roles/roles.entity";

export interface AuthResponseInterface {
  user: {
    id: number;
    username: string;
    roles: RolesEntity[];
    token: string;
}
}
