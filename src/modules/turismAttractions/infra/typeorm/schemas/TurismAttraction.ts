import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export type TStatusTurismAttraction = "active" | "banned" | "inactive";

@Entity({ name: "turismAttractions" })
class TurismAttraction {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  comments: { userId: string; rate: number; message: string }[];

  @Column()
  status: TStatusTurismAttraction;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date;

  toJSON(): TurismAttraction {
    return plainToClass(TurismAttraction, this);
  }
}

export default TurismAttraction;
