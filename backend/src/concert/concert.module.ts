import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert])
  ],
  providers: [ConcertService],
  controllers: [ConcertController]
})
export class ConcertModule {}
