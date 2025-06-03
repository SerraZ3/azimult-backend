import { Exclude, plainToClass } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tokens" })
class UserToken {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Exclude()
  userId: ObjectID;

  @Column()
  // @Exclude()
  token: string;

  @Column()
  key: string;

  @Column()
  description: string;

  @Column()
  isRevoked: boolean;

  @Column()
  type: string;

  @Column()
  tokenExpiration: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  toJSON(): UserToken {
    return plainToClass(UserToken, this);
  }
}

export default UserToken;
