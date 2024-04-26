import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertModule } from './concert/concert.module';
import { ReserveModule } from './reserve/reserve.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'concert-ticketdb',
      entities: [],
      synchronize: true,
    }),
    ConcertModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
