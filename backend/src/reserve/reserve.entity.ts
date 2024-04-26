import { Entity, Column, ObjectIdColumn } from 'typeorm';

export enum ReservationAction {
  RESERVE = 'reserve',
  CANCEL = 'cancel',
}

@Entity()
export class Reserve {
  @ObjectIdColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: ReservationAction,
    default: ReservationAction.RESERVE,
  })
  action: ReservationAction;

  @Column()
  concertId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}