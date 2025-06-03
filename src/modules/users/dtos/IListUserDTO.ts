import { IPagination } from "@shared/infra/http/middleware/pagination";
import { ObjectID } from "typeorm";
import { TUserRole } from "../infra/typeorm/schemas/User";

export default interface IListUserDTO extends IPagination {
  isActive?: boolean;
  role?: TUserRole;
  userId?: ObjectID;
  referrerId?: ObjectID;
  fullName?: string;
  email?: string;
  cpfCnpj?: string;
  referralCode?: string;
}
