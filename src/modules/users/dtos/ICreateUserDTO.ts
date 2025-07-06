import { TUserRole } from "../infra/typeorm/schemas/User";

export default interface ICreateUserDTO {
  email: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  roles?: TUserRole[];
  phone?: string;
  cpfCnpj?: string;
}
