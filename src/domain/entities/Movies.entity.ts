import { DirectorMovie, PosterMovie, TitleMovie } from '@shared/types';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories.entity';
import { Profile } from './Profile.entity';
import { Favories } from './Favories.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('ck_movie_poster_director', ['title', 'poster', 'director'], {
  unique: true,
})
@Entity('Movies', { schema: 'migration1' })
export class Movies {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({ description: 'id', type: 'number' })
  id: number;

  @Column('char', { name: 'title', length: 80 })
  @ApiProperty({ description: 'title', type: 'TitleMovie' })
  title: TitleMovie;

  @Column('varchar', { name: 'poster', length: 250 })
  @ApiProperty({ description: 'poster', type: 'PosterMovie' })
  poster: PosterMovie;

  @Column('varchar', { name: 'director', length: 250 })
  @ApiProperty({ description: 'director', type: 'DirectorMovie' })
  director: DirectorMovie;

  @OneToMany(() => Favories, (favories) => favories.movie)
  @ApiProperty({ description: 'favories', type: 'Favories[]' })
  favories: Favories[];

  @ManyToMany(() => Categories, (categories) => categories.movies)
  @ApiProperty({ description: 'categories', type: 'Categories[]' })
  categories: Categories[];

  @ManyToMany(() => Profile, (profile) => profile.movies)
  @JoinTable({
    name: 'Profile_movie',
    joinColumns: [{ name: 'film_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'profile_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  @ApiProperty({ description: 'profiles', type: 'Profile[]' })
  profiles: Profile[];
}
