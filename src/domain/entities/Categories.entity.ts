import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Books } from './Books.entity';
import { Movies } from './Movies.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('ck_name', ['name'], { unique: true })
@Entity('Categories', { schema: 'migration1' })
export class Categories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @ApiProperty({ description: 'id', type: 'number' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 40 })
  @ApiProperty({ description: 'name', type: 'string' })
  name: string;

  @ManyToMany(() => Books, (books) => books.categories)
  @ApiProperty({ description: 'books', type: 'Books[]' })
  books: Books[];

  @ManyToMany(() => Movies, (movies) => movies.categories)
  @JoinTable({
    name: 'Movie_categorie',
    joinColumns: [{ name: 'category_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'movie_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  @ApiProperty({ description: 'movies', type: 'Movies[]' })
  movies: Movies[];
}
