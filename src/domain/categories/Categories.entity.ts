import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookEntity } from "@domain/books";
import { MovieEntity } from "@domain/movies";
import { NameCategory } from "@shared/types";

@Index("ck_name", ["name"], { unique: true })
@Entity("Categories", { schema: "migration1" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 40 })
  name: NameCategory;

  @ManyToMany(() => BookEntity, (books) => books.categories)
  @JoinTable({
    name: "Book_categories",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "book_id", referencedColumnName: "id" }],
    schema: "migration1",
  })

  books: BookEntity[];

  @ManyToMany(() => MovieEntity, (movies) => movies.categories)
  @JoinTable({
    name: "Movie_categories",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "movie_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  movies: MovieEntity[];
}
