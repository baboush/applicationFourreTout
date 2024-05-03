import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column('enum', {
    name: 'etat',
    enum: ['EN', 'AN', 'F'],
    default: () => "'EN'",
  })
  @ApiProperty({ description: 'etat', type: 'EN" | "AN" | "F"' })
  etat: 'EN' | 'AN' | 'F';

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
