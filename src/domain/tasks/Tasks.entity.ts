import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { ProfileEntity } from "@domain/profiles";

export enum State {
  INPROGRESS = "IP",
  PENDING = "PE",
  FINISH = "FI",
}

@Entity("Tasks", { schema: "migration1" })
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "content", length: 400 })
  content: string;

  @Column("date", { name: "date_finish" })
  dateFinish: Date;

  @Column({ type: "enum", enum: State, default: State.INPROGRESS })
  state: State;

  @ManyToOne(() => ProfileEntity, (profile) => profile.tasks)
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Relation<ProfileEntity>;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
