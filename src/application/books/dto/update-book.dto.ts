import { UpdateBookDto } from "@domain/books/dto";
import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

/**
 * Application-specific DTO class representing data for updating a movie.
 * This DTO likely extends a domain-specific `UpdateBookDto` class
 * and adds presentation logic or validation rules.
 * It targets the "Book" endpoint group within a NestJS application.
 */
export class UpdateBookDtoImp implements UpdateBookDto {
  /**
   * @inheritdoc.UpdateBookDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc.UpdateBookDto.title
   */
  @IsString({ message: "Title book must be a string" })
  @Length(3, 80, { message: "Title book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Title book must not be empty" })
  readonly title: TitleBook;

  /**
   * @inheritdoc.UpdateBookDto.poster
   */
  @IsString({ message: "Poster book must be a string" })
  @Length(50, 250, {
    message: "Poster book must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "Poster book must not be empty" })
  readonly poster: PosterBook;

  /**
   * @inheritdoc.UpdateBookDto.author
   */
  @IsString({ message: "Author book must be a string" })
  @Length(3, 80, { message: "Author book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Author book must not be empty" })
  readonly author: AuthorBook;
}
