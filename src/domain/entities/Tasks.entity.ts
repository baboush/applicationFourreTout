import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Tasks', { schema: 'migration1' })
export class Tasks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({ description: 'id', type: 'number' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  @ApiProperty({ description: 'title', type: 'string' })
  title: string;

  @Column('varchar', { name: 'content', length: 250 })
  @ApiProperty({ description: 'content', type: 'string' })
  content: string;

  @Column('date', { name: 'date_finish' })
  @ApiProperty({ description: 'dateFinish', type: 'string' })
  dateFinish: string;

  @Column('enum', { name: 'etat', enum: ['EC', 'EA', 'F'] })
  @ApiProperty({ description: 'etat', type: 'EC" | "EA" | "F"' })
  etat: 'EC' | 'EA' | 'F';

  @ManyToMany(() => Profile, (profile) => profile.tasks)
  @ApiProperty({ description: 'profiles', type: 'Profile[]' })
  profiles: Profile[];
}
