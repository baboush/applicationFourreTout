import { CreateCategoryDto } from "@domain/categories";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { NameCategory } from "@shared/types";
import { IsNotEmpty, IsString, Length } from "class-validator";

/**
 * @inheritdoc CreateCategoryDto.CreateCategoryDto
 */
@ApiTags("Categories")
export class CreateCategoryDtoApplication implements CreateCategoryDto {
  /**
   * @inheritdoc CreateCategoryDto.id.
   */
  @ApiProperty({ description: "The unique identifier of the category" })
  readonly id?: number;

  /**
   * @inheritdoc CreateCategoryDto.name
   */
  @ApiProperty({
    description: "The name of the category",
    minLength: 5,
    maxLength: 40,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  readonly name: NameCategory;
}
