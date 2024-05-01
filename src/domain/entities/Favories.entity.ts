import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Books } from './Books.entity';
import { Movies } from './Movies.entity';
import { Profile } from './Profile.entity';

@Index('fk_movie_favori', ['movieId'], {})
@Index('fk_profile_favori', ['profileId'], {})
@Entity('Favories', { schema: 'migration1' })
export class Favories {
  @Column('int', { primary: true, name: 'book_id' })
  bookId: number;

  @Column('int', { primary: true, name: 'movie_id' })
  movieId: number;

  @Column('int', { primary: true, name: 'profile_id' })
  profileId: number;

  @ManyToOne(() => Books, (books) => books.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'book_id', referencedColumnName: 'id' }])
  book: Books;

  @ManyToOne(() => Movies, (movies) => movies.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
  movie: Movies;

  @ManyToOne(() => Profile, (profile) => profile.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'profile_id', referencedColumnName: 'id' }])
  profile: Profile;
}
