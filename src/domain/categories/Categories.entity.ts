import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookEntity } from "@domain/books";
import { ApiProperty } from "@nestjs/swagger";
import { MovieEntity } from "@domain/movies";

@Index("ck_name", ["name"], { unique: true })
@Entity("Categories", { schema: "migration1" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 40 })
  @ApiProperty({ description: "name", type: "string" })
  name: string;

  @ManyToMany(() => BookEntity, (books) => books.categories)
  @ApiProperty({ description: "books", type: "Books[]" })
  books: BookEntity[];

  @ManyToMany(() => MovieEntity, (movies) => movies.categories)
  @JoinTable({
    name: "Movie_categorie",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "movie_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "movies", type: "Movies[]" })
  movies: MovieEntity[];
}
