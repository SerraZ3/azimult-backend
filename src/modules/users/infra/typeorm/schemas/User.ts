import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
export type TUserRole = "admin" | "user" | "manager";

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
  cpfCnpj?: string;

  @Column()
  cnpjCategory?: string;

  @Column()
  needUpgrade?: boolean;

  @Column()
  @Exclude()
  password: string;

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
