import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export type TStatusSchedule = "pending" | "approved" | "cancelled" | "finished";

@Entity({ name: "schedules" })
class Schedule {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  date: Date;
  @Column()
  attractionId: ObjectID;
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
