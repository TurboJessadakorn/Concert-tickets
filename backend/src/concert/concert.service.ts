import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(Concert)
        private readonly concertRepository: Repository<Concert>,
    ) { }

    async createConcert(concertData: Partial<Concert>): Promise<Concert> {
        const concert = this.concertRepository.create(concertData);
        return this.concertRepository.save(concert);
    }

    async getConcertById(concertId: ObjectId): Promise<Concert> {
        const concert = await this.concertRepository.findOne({ where: { _id: concertId } });
        if (!concert) {
            throw new NotFoundException('Concert not found');
        }
        return concert;
    }

    async deleteConcert(id: number): Promise<void> {
        await this.concertRepository.delete(id);
    }

    async findAllConcerts(): Promise<Concert[]> {
        return this.concertRepository.find();
    }

    async reserveSeat(concertId: ObjectId, userId: string): Promise<Concert> {
        const concert = await this.concertRepository.findOne({ where: { _id: concertId } });
        if (!concert) {
            throw new NotFoundException('Concert not found');
        }

        if (concert.reservedSeats >= concert.totalSeats) {
            throw new BadRequestException('No available seats to reserve');
        }

        concert.reservedSeats++;
        concert.reservedBy.push(userId);

        return this.concertRepository.save(concert);
    }

    async cancelSeat(concertId: ObjectId, userId: string): Promise<void> {
        const concert = await this.concertRepository.findOne({ where: { _id: concertId } });
        if (!concert) {
            throw new NotFoundException("Concert not found");
        }

        if (!concert.reservedBy.includes(userId)) {
            throw new BadRequestException('User did not reserve a seat');
        }

        concert.reservedSeats--;
        concert.reservedBy = concert.reservedBy.filter(id => id !== userId);

        await this.concertRepository.save(concert);
    }
}