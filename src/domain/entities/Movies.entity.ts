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

@Index('ck_movie_poster_director', ['title', 'poster', 'director'], {
  unique: true,
})
@Entity('Movies', { schema: 'migration1' })
export class Movies {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('char', { name: 'title', length: 80 })
  title: TitleMovie;

  @Column('varchar', { name: 'poster', length: 250 })
  poster: PosterMovie;

  @Column('varchar', { name: 'director', length: 250 })
  director: DirectorMovie;

  @OneToMany(() => Favories, (favories) => favories.movie)
  favories: Favories[];

  @ManyToMany(() => Categories, (categories) => categories.movies)
  categories: Categories[];

  @ManyToMany(() => Profile, (profile) => profile.movies)
  @JoinTable({
    name: 'Profile_movie',
    joinColumns: [{ name: 'film_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'profile_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  profiles: Profile[];
}
