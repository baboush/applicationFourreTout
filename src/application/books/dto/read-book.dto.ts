import { ReadBookDto } from "@domain/books/dto";
import { CategoriesEntity } from "@domain/categories";
import { FavoriesEntity } from "@domain/favories";
import { ProfileEntity } from "@domain/profiles";
import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

/**
 * @inheritdoc ReadBookDto
 */
export class ReadBookDtoImp implements ReadBookDto {
  /**
   * @inheritdoc ReadBookDto.id
   */
  @IsNumber({}, { message: "Id book must be a number" })
  @IsNotEmpty({ message: "Id book must not be empty" })
  readonly id: number;

  /**
   * @inheritdoc ReadBookDto.title
   */
  @IsString({ message: "Title book must be a string" })
  @Length(3, 80, { message: "Title book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Title book must not be empty" })
  readonly title: TitleBook;

  /**
   * @inheritdoc ReadBookDto.poster
   */
  @IsString({ message: "Poster book must be a string" })
  @Length(50, 250, {
    message: "Poster book must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "Poster book must not be empty" })
  readonly poster: PosterBook;

  /**
   * @inheritdoc ReadBookDto.director
   */
  @IsString({ message: "Author book must be a string" })
  @Length(3, 80, { message: "Author book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Author book must not be empty" })
  readonly author: AuthorBook;

  @IsArray()
  readonly categories: CategoriesEntity[];

  @IsArray()
  readonly favories?: FavoriesEntity[];

  @IsArray()
  readonly profiles?: ProfileEntity[];
}
