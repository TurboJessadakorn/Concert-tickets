import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateConcertDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly totalSeats: number;
}