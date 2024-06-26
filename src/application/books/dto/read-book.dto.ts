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
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc ReadBookDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleBook;

  /**
   * @inheritdoc ReadBookDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterBook;

  /**
   * @inheritdoc ReadBookDto.director
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
