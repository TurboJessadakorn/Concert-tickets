import { IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { ReservationAction } from './reserve.entity';
import { ObjectId } from 'typeorm';

export class CreateReservationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  concertName: string;

  @IsEnum(ReservationAction)
  action: ReservationAction;

  @IsNotEmpty()
  @IsInt()
  concertId: ObjectId;

  @IsNotEmpty()
  userId: string;
}