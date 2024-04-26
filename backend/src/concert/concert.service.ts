import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';
import { ObjectId } from 'mongodb';

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
        const convertedConcertId = new ObjectId(concertId);
        const concert = await this.concertRepository.findOne({ where: { _id: convertedConcertId } });
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
    
    async findAllConcertsWithReservation(userId: string): Promise<object[]> {
        const concerts = await this.findAllConcerts();
        const concertsWithReservation = concerts.map(concert => {
          const isReserved = concert.reservedBy.includes(userId);
          return {
            ...concert,
            isReserved,
          };
        });
      
        return concertsWithReservation;
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
        concert.numberOfCancels++;
        concert.reservedBy = concert.reservedBy.filter(id => id !== userId);

        await this.concertRepository.save(concert);
    }
}