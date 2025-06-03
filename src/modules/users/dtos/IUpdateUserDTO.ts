import { IBalance } from "../infra/typeorm/schemas/User";

export default interface IUpdateUserDTO {
  email?: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  street?: string;
  neighborhood?: string;
  city?: string;
  number?: string;
  complement?: string;
  balances?: IBalance;

  cep?: string;
  phone?: string;
  cpfCnpj?: string;
}
