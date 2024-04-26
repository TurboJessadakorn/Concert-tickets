import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Concert {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalSeats: number;

  @Column({ default: 0 })
  reservedSeats: number = 0;

  @Column({ default: 0 })
  numberOfCancels: number = 0;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  // Array of user IDs who have reserved seats
  @Column({ type: 'array', default: [] })
  reservedBy: string[] = [];
}