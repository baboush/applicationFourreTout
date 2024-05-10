import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CategoriesEntity } from "@domain/categories";
import { ProfileEntity } from "@domain/profiles";
import { FavoriesEntity } from "@domain/favories";

@Index("ck_movie_poster_director", ["title", "poster", "director"], {
  unique: true,
})
@Entity("Movies", { schema: "migration1" })
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "title", length: 80 })
  @ApiProperty({ description: "title", type: "TitleMovie" })
  title: TitleMovie;

  @Column("varchar", { name: "poster", length: 250 })
  @ApiProperty({ description: "poster", type: "PosterMovie" })
  poster: PosterMovie;

  @Column("varchar", { name: "director", length: 250 })
  @ApiProperty({ description: "director", type: "DirectorMovie" })
  director: DirectorMovie;

  @OneToMany(() => FavoriesEntity, (favories) => favories.movie)
  @ApiProperty({ description: "favories", type: "Favories[]" })
  favories: FavoriesEntity[];

  @ManyToMany(() => CategoriesEntity, (categories) => categories.movies)
  @ApiProperty({ description: "categories", type: "Categories[]" })
  categories: CategoriesEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.movies)
  @JoinTable({
    name: "Profile_movie",
    joinColumns: [{ name: "film_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "profiles", type: "Profile[]" })
  profiles: ProfileEntity[];
}
