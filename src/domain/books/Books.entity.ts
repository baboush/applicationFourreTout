import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
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
import { FavoriesEntity } from "@domain/favories";
import { ProfileEntity } from "@domain/profiles";

@Index("ck_title_author_poster", ["title", "author", "poster"], {
  unique: true,
})
@Entity("Books", { schema: "migration1" })
export class Books {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "title", length: 80 })
  @ApiProperty({ description: "title", type: "TitleBook" })
  title: TitleBook;

  @Column("varchar", { name: "author", length: 250 })
  @ApiProperty({ description: "author", type: "AuthorBook" })
  author: AuthorBook;

  @Column("varchar", { name: "poster", nullable: true, length: 250 })
  @ApiProperty({ description: "poster", type: "any" })
  poster: PosterBook | null;

  @ManyToMany(() => CategoriesEntity, (categories) => categories.books)
  @JoinTable({
    name: "Book_categorie",
    joinColumns: [{ name: "book_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "categories", type: "Category[]" })
  categories: CategoriesEntity[];

  @OneToMany(() => FavoriesEntity, (favories) => favories.book)
  @ApiProperty({ description: "favories", type: "Favories[]" })
  favories: FavoriesEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.books)
  @JoinTable({
    name: "Profile_book",
    joinColumns: [{ name: "book_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "profile_id", referencedColumnName: "id" }],
    schema: "migration1",
  })
  @ApiProperty({ description: "profiles", type: "Profile[]" })
  profiles: ProfileEntity[];
}
