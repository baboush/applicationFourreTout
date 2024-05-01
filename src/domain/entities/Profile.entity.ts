import { Name, Surname } from '@shared/types';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favories } from './Favories.entity';
import { User } from './User.entity';
import { Appointment } from './Appointment.entity';
import { Books } from './Books.entity';
import { Movies } from './Movies.entity';
import { Tasks } from './Tasks.entity';

@Index('fk_profile_id', ['userId'], {})
@Entity('Profile', { schema: 'migration1' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 40 })
  name: Name | null;

  @Column('varchar', { name: 'surname', nullable: true, length: 50 })
  surname: Surname | null;

  @Column('int', { name: 'userId' })
  userId: number;

  @OneToMany(() => Favories, (favories) => favories.profile)
  favories: Favories[];

  @ManyToOne(() => User, (user) => user.profiles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToMany(() => Appointment, (appointment) => appointment.profiles)
  appointments: Appointment[];

  @ManyToMany(() => Books, (books) => books.profiles)
  books: Books[];

  @ManyToMany(() => Movies, (movies) => movies.profiles)
  movies: Movies[];

  @ManyToMany(() => Tasks, (tasks) => tasks.profiles)
  @JoinTable({
    name: 'Profile_task',
    joinColumns: [{ name: 'profile_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'task_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  tasks: Tasks[];
}
