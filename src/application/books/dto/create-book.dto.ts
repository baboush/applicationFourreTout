import { CreateBookDto } from "@domain/books/dto";
import { AuthorBook, PosterBook, TitleBook } from "@shared/types";
import { IsNotEmpty, IsString, Length } from "class-validator";

/*
 * @inheritdoc CreateBookDto
 */
export class CreateBookDtoImp implements CreateBookDto {
  /**
   * @inheritdoc CreateBookDto.title
   */
  @IsString({ message: "Title book must be a string" })
  @Length(3, 80, { message: "Title book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Title book must not be empty" })
  readonly title: TitleBook;

  /**
   * @inheritdoc CreateBookDto.director
   */
  @IsString({ message: "Author book must be a string" })
  @Length(3, 80, { message: "Author book must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "Author book must not be empty" })
  readonly author: AuthorBook;

  /**
   * @inheritdoc CreateBookDto.poster
   */
  @IsString({ message: "Poster book must be a string" })
  @Length(50, 250, {
    message: "Poster book must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "Poster book must not be empty" })
  readonly poster: PosterBook;
}
