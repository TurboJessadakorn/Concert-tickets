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

  // Retrieve all concerts (for admin)
  @Get()
  @UseGuards(AdminGuard)
  async findAllConcerts(): Promise<object> {
    try {
      const concerts = await this.concertService.findAllConcerts();
      return {
        success: true,
        message: 'Concerts retrieved successfully',
        data: concerts,
      };
    } catch (error) {
      throw error;
    }
  }

  // Reserve a seat for a concert (for user)
  @Post(':id/reserve/:userId')
  @UseGuards(UserGuard)
  async reserveSeatConcert(@Param('id') id: ObjectId, @Param('userId') userId: string): Promise<object> {
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
}