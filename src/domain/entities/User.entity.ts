import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';
import { Email, Password, Username } from '@shared/types';

@Index('ck_email', ['email'], { unique: true })
@Entity('User', { schema: 'migration1' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', length: 80 })
  username: Username;

  @Column('varchar', { name: 'password', length: 250 })
  password: Password;

  @Column('varchar', { name: 'email', unique: true, length: 80 })
  email: Email;

  @Column('enum', {
    name: 'role',
    enum: ['ADMIN', 'USER', 'CONTRIBUTEUR'],
    default: () => "'USER'",
  })
  role: 'ADMIN' | 'USER' | 'CONTRIBUTEUR';

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
