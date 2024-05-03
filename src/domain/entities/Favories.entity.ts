import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Books } from './Books.entity';
import { Movies } from './Movies.entity';
import { Profile } from './Profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('fk_movie_favori', ['movieId'], {})
@Index('fk_profile_favori', ['profileId'], {})
@Entity('Favories', { schema: 'migration1' })
export class Favories {
  @Column('int', { primary: true, name: 'book_id' })
  @ApiProperty({ description: 'bookId', type: 'number' })
  bookId: number;

  @Column('int', { primary: true, name: 'movie_id' })
  @ApiProperty({ description: 'movieId', type: 'number' })
  movieId: number;

  @Column('int', { primary: true, name: 'profile_id' })
  @ApiProperty({ description: 'profileId', type: 'number' })
  profileId: number;

  @ManyToOne(() => Books, (books) => books.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'book_id', referencedColumnName: 'id' }])
  @ApiProperty({ description: 'book', type: 'Books' })
  book: Books;

  @ManyToOne(() => Movies, (movies) => movies.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
  @ApiProperty({ description: 'movie', type: 'Movies' })
  movie: Movies;

  @ManyToOne(() => Profile, (profile) => profile.favories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'profile_id', referencedColumnName: 'id' }])
  @ApiProperty({ description: 'profile', type: 'Profile' })
  profile: Profile;
}
