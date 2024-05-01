import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';

@Entity('Appointment', { schema: 'migration1' })
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('varchar', { name: 'content', length: 250 })
  content: string;

  @Column('enum', {
    name: 'etat',
    enum: ['EN', 'AN', 'F'],
    default: () => "'EN'",
  })
  etat: 'EN' | 'AN' | 'F';

  @Column('date', { name: 'date_appointment' })
  dateAppointment: Date;

  @ManyToMany(() => Profile, (profile) => profile.appointments)
  @JoinTable({
    name: 'Profile_appointment',
    joinColumns: [{ name: 'appointment_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'profile_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  profiles: Profile[];
}
