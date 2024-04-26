import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { ConcertModule } from 'src/concert/concert.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './reserve.entity';
import { ConcertService } from 'src/concert/concert.service';
import { Concert } from 'src/concert/concert.entity';

@Module({
  imports: [
    ConcertModule, 
    TypeOrmModule.forFeature([Reserve]),
    TypeOrmModule.forFeature([Concert])
  ],
  providers: [ReserveService, ConcertService],
  controllers: [ReserveController],
})
export class ReserveModule {}
