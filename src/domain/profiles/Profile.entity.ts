import { Name, Surname } from "@shared/types";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FavoriesEntity } from "@domain/favories";
import { AppointmentEntity } from "@domain/appointements";
import { BookEntity } from "@domain/books";
import { MovieEntity } from "@domain/movies";
import { TaskEntity } from "@domain/tasks";

@Entity("Profile", { schema: "migration1" })
export class Profile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 40 })
  name: Name | null;

  @Column("varchar", { name: "surname", nullable: true, length: 50 })
  surname: Surname | null;

  @OneToMany(() => FavoriesEntity, (favories) => favories.profile)
  favories: FavoriesEntity[];

  @ManyToMany(() => AppointmentEntity, (appointment) => appointment.profiles)
  appointments: AppointmentEntity[];

  @ManyToMany(() => BookEntity, (books) => books.profiles)
  books: BookEntity[];

  @ManyToMany(() => MovieEntity, (movies) => movies.profiles)
  movies: MovieEntity[];

  @ManyToMany(() => TaskEntity, (tasks) => tasks.profiles)
  @JoinTable({
    name: "Profile_task",
    joinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "task_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  tasks: TaskEntity[];
}
