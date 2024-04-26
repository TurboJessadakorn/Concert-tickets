import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

export enum ReservationAction {
  RESERVE = 'reserve',
  CANCEL = 'cancel',
}

@Entity()
export class Reserve {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: ReservationAction,
    default: ReservationAction.RESERVE,
  })
  action: ReservationAction;

  @ObjectIdColumn()
  concertId: ObjectId;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}