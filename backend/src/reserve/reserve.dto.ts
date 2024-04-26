import { IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { ReservationAction } from './reserve.entity';

export class CreateReservationDto {
  @IsNotEmpty()
  username: string;

  @IsEnum(ReservationAction)
  action: ReservationAction;

  @IsNotEmpty()
  @IsInt()
  concertId: number;

  @IsNotEmpty()
  userId: string;
}