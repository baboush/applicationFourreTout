import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProfileEntity } from "@domain/profiles";

export enum Etat {
  ENCOUR = "en",
  ENATTENTE = "ea",
  FINI = "fi",
}

@Entity("Tasks", { schema: "migration1" })
export class Tasks {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "title", length: 50 })
  @ApiProperty({ description: "title", type: "string" })
  title: string;

  @Column("varchar", { name: "content", length: 250 })
  @ApiProperty({ description: "content", type: "string" })
  content: string;

  @Column("date", { name: "date_finish" })
  @ApiProperty({ description: "dateFinish", type: "string" })
  dateFinish: string;

  @Column({ type: "enum", enum: Etat, default: Etat.ENCOUR })
  @ApiProperty({ description: "etat", type: 'EC" | "EA" | "F"' })
  etat: Etat;

  @ManyToMany(() => ProfileEntity, (profile) => profile.tasks)
  @ApiProperty({ description: "profiles", type: "Profile[]" })
  profiles: ProfileEntity[];
}
