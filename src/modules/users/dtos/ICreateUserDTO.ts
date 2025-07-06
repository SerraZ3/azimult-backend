import { TBalance } from "../infra/typeorm/schemas/User";

export default interface ICreateUserDTO {
  email: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  roles?: Array<"admin" | "user">;
  phone?: string;
  cpfCnpj?: string;
}
