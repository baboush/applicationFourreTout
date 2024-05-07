import { Name, Surname } from "@shared/types";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Favories } from "./Favories.entity";
import { Appointment } from "./Appointment.entity";
import { Books } from "./Books.entity";
import { Movies } from "./Movies.entity";
import { Tasks } from "./Tasks.entity";
import { ApiProperty } from "@nestjs/swagger";

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

  @OneToMany(() => Favories, (favories) => favories.profile)
  @ApiProperty({ description: "favories", type: [Favories] })
  favories: Favories[];

  @ManyToMany(() => Appointment, (appointment) => appointment.profiles)
  @ApiProperty({ description: "appointments", type: [Appointment] })
  appointments: Appointment[];

  @ManyToMany(() => Books, (books) => books.profiles)
  @ApiProperty({ description: "books", type: [Books] })
  books: Books[];

  @ManyToMany(() => Movies, (movies) => movies.profiles)
  @ApiProperty({ description: "movies", type: [Movies] })
  movies: Movies[];

  @ManyToMany(() => Tasks, (tasks) => tasks.profiles)
  @JoinTable({
    name: "Profile_task",
    joinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "task_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "tasks", type: [Tasks] })
  tasks: Tasks[];
}
