import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateComplaintDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsArray()
  readonly categories: string[];
}
