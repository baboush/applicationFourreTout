import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "@domain/books";
import { MovieEntity } from "@domain/movies";
import { ProfileEntity } from "@domain/profiles";

@Index("fk_movie_favori", ["movieId"], {})
@Index("fk_profile_favori", ["profileId"], {})
@Entity("Favories", { schema: "migration1" })
export class Favories {
  @Column("int", { primary: true, name: "book_id" })
  @ApiProperty({ description: "bookId", type: "number" })
  bookId: number;

  @Column("int", { primary: true, name: "movie_id" })
  @ApiProperty({ description: "movieId", type: "number" })
  movieId: number;

  @Column("int", { primary: true, name: "profile_id" })
  @ApiProperty({ description: "profileId", type: "number" })
  profileId: number;

  @ManyToOne(() => BookEntity, (books) => books.favories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  @ApiProperty({ description: "book", type: "Books" })
  book: BookEntity;

  @ManyToOne(() => MovieEntity, (movies) => movies.favories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "id" }])
  @ApiProperty({ description: "movie", type: "Movies" })
  movie: MovieEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.favories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  @ApiProperty({ description: "profile", type: "Profile" })
  profile: ProfileEntity;
}
