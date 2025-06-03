import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

// export type TOrigin = "bank" | "broker" | "wallet";
export type TLogType = "BANK" | "BROKER" | "ERROR" | "QUEUE";

@Entity({ name: "logs" })
class Log {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: TLogType;

  @Column()
  action: string;

  @Column()
  key: string;

  @Column()
  data: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date;

  toJSON(): Log {
    return plainToClass(Log, this);
  }
}

export default Log;
