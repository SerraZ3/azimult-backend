import { TBalance } from "../infra/typeorm/schemas/User";

export default interface ICreateUserDTO {
  email: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  referralCode: string;
  referrerId: ObjectID;
  roles?: Array<"admin" | "user">;
  balances?: TBalance;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  number?: string;
  complement?: string;
  cep?: string;
  phone?: string;
  cpfCnpj?: string;
}
