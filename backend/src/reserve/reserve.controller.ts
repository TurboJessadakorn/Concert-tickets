import { Controller, Get, Post, Delete, Param, UseGuards, ForbiddenException, Body, BadRequestException } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReservationAction, Reserve } from './reserve.entity';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateReservationDto } from './reserve.dto';

@Controller('reserve')
export class ReserveController {
    constructor(private readonly reserveService: ReserveService) { }

    // Reserve a concert (for user)
    @Post('reserve')
    @UseGuards(UserGuard)
    async reserve(@Body() createReservationDto: CreateReservationDto): Promise<Reserve> {
        try {
            // Check if action format is correct
            if (createReservationDto.action !== ReservationAction.RESERVE) {
                throw new ForbiddenException('Invalid action');
            }

            // Check if the user has already reserved a seat in this concert
            const hasReserved = await this.reserveService.hasUserReserved(createReservationDto.userId, createReservationDto.concertId);
            if (hasReserved) {
                throw new BadRequestException('User has already reserved a seat for this concert');
            }

            return this.reserveService.reserve(createReservationDto.username, createReservationDto.userId, createReservationDto.concertId, createReservationDto.concertName);
        } catch (error) {
            throw error;
        }
    }

    // Cancel a concert (for user)
    @Post('cancel')
    @UseGuards(UserGuard)
    async cancel(@Body() createReservationDto: CreateReservationDto): Promise<Reserve> {
        try {
            // Check if action format is correct
            if (createReservationDto.action !== ReservationAction.CANCEL) {
                throw new ForbiddenException('Invalid action');
            }

            // Check if the user has already reserved a seat in this concert
            const hasReserved = await this.reserveService.hasUserReserved(createReservationDto.userId, createReservationDto.concertId);
            if (!hasReserved) {
                throw new BadRequestException('User has not reserved a seat for this concert');
            }

            return this.reserveService.cancel(createReservationDto.username, createReservationDto.userId, createReservationDto.concertId, createReservationDto.concertName);
        } catch (error) {
            throw error;
        }
    }

    // Retrieve all reservation all reservations made by a specific user (for user)
    @Get('user/:userId')
    @UseGuards(UserGuard)
    async findAllByUser(@Param('userId') userId: string): Promise<Reserve[]> {
        try {
            return this.reserveService.findAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    // Retrieve all reservations (for admin)
    @Get('admin')
    @UseGuards(AdminGuard)
    async findAll(): Promise<Reserve[]> {
        try {
            return this.reserveService.findAll();
        } catch (error) {
            throw error;
        }
    }
}