import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum etat {
  ENCOUR = 'EN',
  ANNULER = 'AN',
  FINI = 'FI',
}

@Entity('Appointment', { schema: 'migration1' })
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({ description: 'id', type: 'number' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  @ApiProperty({ description: 'title', type: 'string' })
  title: string;

  @Column('varchar', { name: 'content', length: 250 })
  @ApiProperty({ description: 'content', type: 'string' })
  content: string;

  @Column({
    type: 'enum',
    enum: etat,
    default: etat.ENCOUR,
  })
  @ApiProperty({ description: 'etat', type: 'EN" | "AN" | "F"' })
  etat: etat;

  @Column('date', { name: 'date_appointment' })
  @ApiProperty({ description: 'dateAppointment', type: 'Date' })
  dateAppointment: Date;

  @ManyToMany(() => Profile, (profile) => profile.appointments)
  @JoinTable({
    name: 'Profile_appointment',
    joinColumns: [{ name: 'appointment_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'profile_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  @ApiProperty({ description: 'profiles', type: 'Profile' })
  profiles: Profile[];
}
