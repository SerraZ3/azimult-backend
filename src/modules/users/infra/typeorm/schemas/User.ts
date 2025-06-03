import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
export type TUserRole = "admin" | "user";
import { TCoinKeys } from "@config/coin";

export interface TBalance {
  brl: { value: string };
  btc: { value: string };
  usdt: { value: string };
  eth: { value: string };
}
export interface ICompliance {
  front: { files: string; approved: boolean; message?: "" };
  back: { files: string; approved: boolean; message?: "" };
  self: { files: string; approved: boolean; message?: "" };
  status: "pending" | "approved" | "refused";
}

export interface IComplianceUpgrade {
  declaration: { files: string; approved: boolean; message?: "" };
  address: { files: string; approved: boolean; message?: "" };
  contract?: { files: string; approved: boolean; message?: "" };
  status: "pending" | "approved" | "refused";
  message: string;
  feedback?: string;
}

export interface ILimits {
  deposit: string;
}
@Entity({ name: "users" })
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  referrerId: ObjectID;

  @Column()
  referralCode: string;

  @Column()
  referrerPercent?: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  street?: string;

  @Column()
  state?: string;

  @Column()
  compliance?: ICompliance;

  @Column()
  complianceUpgrade?: ICompliance;

  @Column()
  limits?: ILimits;

  @Column()
  neighborhood?: string;

  @Column()
  city?: string;

  @Column()
  number?: string;

  @Column()
  complement?: string;

  @Column()
  cep?: string;

  @Column()
  phone?: string;

  @Column()
  cpfCnpj?: string;

  @Column()
  cnpjCategory?: string;

  @Column()
  needUpgrade?: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column()
  balances: TBalance;

  @Column()
  roles: Array<TUserRole>;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  toJSON(): User {
    return plainToClass(User, this);
  }
}

export default User;
