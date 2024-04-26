import { Body, Controller, Delete, Get, HttpException, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Concert } from './concert.entity';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './concert.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { ObjectId } from 'typeorm';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) { }

  // Create a new concert (for admin)
  @Post()
  @UseGuards(AdminGuard)
  async createConcert(@Body(new ValidationPipe()) concertData: CreateConcertDto): Promise<object> {
    try {
      const createdConcert = await this.concertService.createConcert(concertData);
      return {
        success: true,
        message: 'Concert created successfully',
        data: createdConcert,
      };
    } catch (error) {
      throw new error;
    }
  }

  // Delete a concert by ID (for admin)
  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteConcert(@Param('id') id: number): Promise<object> {
    try {
      await this.concertService.deleteConcert(id);
      return {
        success: true,
        message: 'Concert deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // Retrieve all concerts get userid to find reserved status(for user)
  @Get(':userId')
  @UseGuards(UserGuard)
  async findAllConcertsWithReservation(@Param('userId') userId: string): Promise<object> {
    try {
      const concerts = await this.concertService.findAllConcertsWithReservation(userId);
      return {
        success: true,
        message: 'Concerts retrieved successfully with reservation status',
        data: concerts,
      };
    } catch (error) {
      throw error;
    }
  }

  // Reserve a seat for a concert (for user)
  @Post(':id/reserve/:userId')
  @UseGuards(UserGuard)
  async reserveSeat(@Param('id') id: ObjectId, @Param('userId') userId: string): Promise<object> {
    try {
      const updatedConcert = await this.concertService.reserveSeat(id, userId);
      return {
        success: true,
        message: 'Seat reserved successfully',
        data: updatedConcert,
      };
    } catch (error) {
      throw error;
    }
  }

  // Cancel a seat reservation for a concert (for user)
  @Post(':id/cancel/:userId')
  @UseGuards(UserGuard)
  async cancelSeat(@Param('id') id: ObjectId, @Param('userId') userId: string): Promise<object> {
    try {
      const updatedConcert = await this.concertService.cancelSeat(id, userId);
      return {
        success: true,
        message: 'Seat reservation canceled successfully',
        data: updatedConcert,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get each seats count to display on admin page
  @Get('stats/count')
  @UseGuards(AdminGuard)
  async getConcertStats(): Promise<object> {
    try {
      const totalSeats = await this.concertService.getTotalSeats();
      const totalReservedSeats = await this.concertService.getTotalReservedSeats();
      const totalCanceledSeats = await this.concertService.getTotalCanceledSeats();
      return {
        success: true,
        message: 'Concert statistics retrieved successfully',
        data: {
          totalSeats,
          totalReservedSeats,
          totalCanceledSeats,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}