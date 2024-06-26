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
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleBook;

 /**
   * @inheritdoc CreateBookDto.director
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly author: AuthorBook;

  /**
   * @inheritdoc CreateBookDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterBook;
 }
