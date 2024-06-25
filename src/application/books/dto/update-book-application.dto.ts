import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
import { UpdateBookDto } from "@domain/books/dto";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

/**
 * Application-specific DTO class representing data for updating a movie.
 * This DTO likely extends a domain-specific `UpdateBookDto` class
 * and adds presentation logic or validation rules.
 * It targets the "Book" endpoint group within a NestJS application.
 */
export class UpdateBookApplicationDto implements UpdateBookDto {
  /**
   * @inheritdoc.UpdateBookDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc.UpdateBookDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleBook;

  /**
   * @inheritdoc.UpdateBookDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterBook;

  /**
   * @inheritdoc.UpdateBookDto.author
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly author: AuthorBook;
}
