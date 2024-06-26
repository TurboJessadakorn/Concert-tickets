import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertModule } from './concert/concert.module';
import { ReserveModule } from './reserve/reserve.module';
import { Concert } from './concert/concert.entity';
import { Reserve } from './reserve/reserve.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGODB_HOST || 'localhost',
      port: parseInt(process.env.MONGODB_PORT || '27017'),
      database: process.env.MONGODB_DB_NAME || 'concert-ticketdb',
      entities: [Reserve, Concert],
      synchronize: true,
    }),
    ConcertModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
