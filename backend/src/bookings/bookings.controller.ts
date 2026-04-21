import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService, Booking } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Booking[] {
    // Return user's bookings
    return this.bookingsService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Booking | null {
    const booking = this.bookingsService.findOne(+id);
    // Check if booking belongs to user
    if (booking && booking.userId !== req.user.userId) {
      return null;
    }
    return booking;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() bookingData: any, @Request() req): Booking {
    return this.bookingsService.create({
      ...bookingData,
      userId: req.user.userId
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() bookingData: any, @Request() req): Booking | null {
    const booking = this.bookingsService.findOne(+id);
    if (!booking || booking.userId !== req.user.userId) {
      return null;
    }
    return this.bookingsService.update(+id, bookingData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    const booking = this.bookingsService.findOne(+id);
    if (!booking || booking.userId !== req.user.userId) {
      return false;
    }
    return this.bookingsService.delete(+id);
  }
}
