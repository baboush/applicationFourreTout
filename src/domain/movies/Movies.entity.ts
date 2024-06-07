import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CategoriesEntity } from "@domain/categories";
import { ProfileEntity } from "@domain/profiles";
import { FavoriesEntity } from "@domain/favories";

@Index("ck_movie_poster_director", ["title", "poster", "director"], {
  unique: true,
})
@Entity("Movies", { schema: "migration1" })
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 80 })
  title: TitleMovie;

  @Column("varchar", { name: "poster", length: 250 })
  poster: PosterMovie;

  @Column("varchar", { name: "director", length: 250 })
  director: DirectorMovie;

  @OneToMany(() => FavoriesEntity, (favories) => favories.movie)
  favories: FavoriesEntity[];

  @ManyToMany(() => CategoriesEntity, (categories) => categories.movies)
  categories: CategoriesEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.movies)
  @JoinTable({
    name: "Profile_movie",
    joinColumns: [{ name: "film_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  profiles: ProfileEntity[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
