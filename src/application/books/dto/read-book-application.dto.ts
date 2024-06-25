import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";
import { BookDto } from "@domain/books/dto";
import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
import { CategoriesEntity } from "@domain/categories";
import { FavoriesEntity } from "@domain/favories";
import { ProfileEntity } from "@domain/profiles";

/**
 * @inheritdoc BookDto
 */
export class ReadBookApplicationDto implements BookDto {
  /**
   * @inheritdoc BookDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc BookDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleBook;

  /**
   * @inheritdoc BookDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterBook;

  /**
   * @inheritdoc BookDto.director
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly author: AuthorBook;

  @IsArray()
  readonly categories: CategoriesEntity[];

  @IsArray()
  readonly favories?: FavoriesEntity[];

  @IsArray()
  readonly profiles?: ProfileEntity[];
}
