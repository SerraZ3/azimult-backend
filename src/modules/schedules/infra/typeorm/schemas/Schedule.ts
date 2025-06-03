import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

// export type TOrigin = "bank" | "broker" | "wallet";
export type TScheduleType = "MAINTENANCE" | "FEES" | "COINS";

export interface IMaintenance {
  in: boolean;
  out: boolean;
  swap: boolean;
  userTest: string[];
}
export interface IFees {
  in: string;
  out: string;
  swap: string;
  referral: string;
}

export type TStatusSchedule = "pending" | "approved" | "cancelled" | "finished";

@Entity({ name: "schedules" })
class Schedule {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  date: Date;

  @Column()
  status: TStatusSchedule;

  @Column()
  observation: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date;

  toJSON(): Schedule {
    return plainToClass(Schedule, this);
  }
}

export default Schedule;
