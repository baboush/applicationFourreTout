import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
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
import { FavoriesEntity } from "@domain/favories";
import { ProfileEntity } from "@domain/profiles";

@Index("ck_title_author_poster", ["title", "author", "poster"], {
  unique: true,
})
@Entity("Books", { schema: "migration1" })
export class Books {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 80 })
  title: TitleBook;

  @Column("varchar", { name: "author", length: 80 })
  author: AuthorBook;

  @Column("varchar", { name: "poster", nullable: true, length: 250 })
  poster: PosterBook | null;

  @ManyToMany(() => CategoriesEntity, (categories) => categories.books)
  categories: CategoriesEntity[];

  @OneToMany(() => FavoriesEntity, (favories) => favories.book)
  favories: FavoriesEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.books)
  @JoinTable({
    name: "Profile_book",
    joinColumns: [{ name: "book_id", referencedColumnName: "id" }],
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
