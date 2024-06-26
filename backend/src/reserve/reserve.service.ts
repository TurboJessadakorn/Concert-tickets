import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Reserve, ReservationAction } from './reserve.entity';
import { ConcertService } from '../concert/concert.service';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    private readonly concertService: ConcertService
  ) {}

  async reserve(username: string, userId: string, concertId: ObjectId, concertName: string): Promise<Reserve> {
    // before create new reservation add userId to concertEntity and +reserved seat
    const concert = await this.concertService.getConcertById(concertId);
    await this.concertService.reserveSeat(concert._id, userId);

    const reserve = this.reserveRepository.create({ username, userId, action: ReservationAction.RESERVE, concertId, concertName });
    return this.reserveRepository.save(reserve);
  }

  async cancel(username: string, userId: string, concertId: ObjectId, concertName: string): Promise<Reserve> {
    // before create new reservation remove userId to concertEntity and -reserved seat +cancel seat
    const concert = await this.concertService.getConcertById(concertId);
    await this.concertService.cancelSeat(concert._id, userId);

    const reservation = this.reserveRepository.create({ username, userId, action: ReservationAction.CANCEL, concertId, concertName });
    return this.reserveRepository.save(reservation);
  }

  async findAllByUserId(userId: string): Promise<Reserve[]> {
    return this.reserveRepository.find({ where: { userId } });
  }

  async findAll(): Promise<Reserve[]> {
    return this.reserveRepository.find();
  }

  async hasUserReserved(userId: string, concertId: ObjectId): Promise<boolean> {
    const concert = await this.concertService.getConcertById(concertId);
    return concert.reservedBy.includes(userId);
  }
}
