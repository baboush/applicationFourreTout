import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProfileEntity } from "@domain/profiles";

export enum etat {
  ENCOUR = "EN",
  ANNULER = "AN",
  FINI = "FI",
}

@Entity("Appointment", { schema: "migration1" })
export class Appointment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "content", length: 250 })
  content: string;

  @Column({
    type: "enum",
    enum: etat,
    default: etat.ENCOUR,
  })
  etat: etat;

  @Column("date", { name: "date_appointment" })
  dateAppointment: Date;

  @ManyToMany(() => ProfileEntity, (profile) => profile.appointments)
  @JoinTable({
    name: "Profile_appointment",
    joinColumns: [{ name: "appointment_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  profiles: ProfileEntity[];
}
