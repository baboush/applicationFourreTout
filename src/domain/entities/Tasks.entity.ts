import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile.entity';

@Entity('Tasks', { schema: 'migration1' })
export class Tasks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('varchar', { name: 'content', length: 250 })
  content: string;

  @Column('date', { name: 'date_finish' })
  dateFinish: string;

  @Column('enum', { name: 'etat', enum: ['EC', 'EA', 'F'] })
  etat: 'EC' | 'EA' | 'F';

  @ManyToMany(() => Profile, (profile) => profile.tasks)
  profiles: Profile[];
}
