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

@Index('ck_name', ['name'], { unique: true })
@Entity('Categories', { schema: 'migration1' })
export class Categories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 40 })
  name: string;

  @ManyToMany(() => Books, (books) => books.categories)
  books: Books[];

  @ManyToMany(() => Movies, (movies) => movies.categories)
  @JoinTable({
    name: 'Movie_categorie',
    joinColumns: [{ name: 'category_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'movie_id', referencedColumnName: 'id' }],
    schema: 'migration1',
  })
  movies: Movies[];
}
