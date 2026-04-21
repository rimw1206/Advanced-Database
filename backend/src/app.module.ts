import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'hotel_management',

      entities: ['dist/**/*.entity.js'],

      synchronize: true,

      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),

    AuthModule,
    UsersModule,
    HotelsModule,
    RoomsModule,
    BookingsModule,
    PricingModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
