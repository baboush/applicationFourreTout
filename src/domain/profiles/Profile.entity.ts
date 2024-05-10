import { Name, Surname } from "@shared/types";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { FavoriesEntity } from "@domain/favories";
import { AppointmentEntity } from "@domain/appointements";
import { BookEntity } from "@domain/books";
import { MovieEntity } from "@domain/movies";
import { TaskEntity } from "@domain/tasks";

@Entity("Profile", { schema: "migration1" })
export class Profile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 40 })
  @ApiProperty({ description: "name", type: "any" })
  name: Name | null;

  @Column("varchar", { name: "surname", nullable: true, length: 50 })
  @ApiProperty({ description: "surname", type: "Surname" })
  surname: Surname | null;

  @OneToMany(() => FavoriesEntity, (favories) => favories.profile)
  @ApiProperty({ description: "favories", type: [FavoriesEntity] })
  favories: FavoriesEntity[];

  @ManyToMany(() => AppointmentEntity, (appointment) => appointment.profiles)
  @ApiProperty({ description: "appointments", type: [AppointmentEntity] })
  appointments: AppointmentEntity[];

  @ManyToMany(() => BookEntity, (books) => books.profiles)
  @ApiProperty({ description: "books", type: [BookEntity] })
  books: BookEntity[];

  @ManyToMany(() => MovieEntity, (movies) => movies.profiles)
  @ApiProperty({ description: "movies", type: [MovieEntity] })
  movies: MovieEntity[];

  @ManyToMany(() => TaskEntity, (tasks) => tasks.profiles)
  @JoinTable({
    name: "Profile_task",
    joinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "task_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "tasks", type: [TaskEntity] })
  tasks: TaskEntity[];
}
