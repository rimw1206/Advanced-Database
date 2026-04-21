import { Injectable } from '@nestjs/common';

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [
    {
      id: 1,
      userId: 1,
      roomId: 3,
      checkIn: new Date('2026-04-25'),
      checkOut: new Date('2026-04-27'),
      guests: 4,
      totalPrice: 360,
      status: 'confirmed',
      createdAt: new Date('2026-04-20')
    }
  ];

  private nextId = 2;

  findAll() {
    return this.bookings;
  }

  findByUser(userId: number) {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  findOne(id: number) {
    return this.bookings.find(booking => booking.id === id);
  }

  create(bookingData: Omit<Booking, 'id' | 'createdAt'>) {
    const booking: Booking = {
      id: this.nextId++,
      ...bookingData,
      createdAt: new Date()
    };
    this.bookings.push(booking);
    return booking;
  }

  update(id: number, bookingData: Partial<Booking>) {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index === -1) return null;

    this.bookings[index] = { ...this.bookings[index], ...bookingData };
    return this.bookings[index];
  }

  delete(id: number) {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index === -1) return false;

    this.bookings.splice(index, 1);
    return true;
  }
}
