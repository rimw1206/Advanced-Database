import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(private dataSource: DataSource) {}

  async getTopRoomsPerHotel() {
    return this.dataSource.query(
      `SELECT * FROM vw_top_rooms_per_hotel WHERE rank_in_hotel <= 3`,
    );
  }

  async getMonthlyRevenue(year: number, month: number) {
    return this.dataSource.query(
      `SELECT * FROM vw_monthly_revenue 
       WHERE year = @year AND month = @month`,
      [year, month],
    );
  }

  async getOccupancyRate(roomTypeId: number) {
    const query = `
      DECLARE @occupancy_rate DECIMAL(5, 2);
      EXEC sp_get_occupancy_rate 
        @room_type_id = @roomTypeId,
        @occupancy_rate = @occupancy_rate OUTPUT;
      SELECT @occupancy_rate as occupancyRate;
    `;

    const result = await this.dataSource.query(query, [roomTypeId]);
    return result[0];
  }

  async getRevenueWithWindowFunctions(hotelId?: number) {
    const whereClause = hotelId ? `WHERE h.hotel_id = @hotelId` : '';
    return this.dataSource.query(
      `
      SELECT
        h.hotel_id,
        h.name,
        rt.room_type_id,
        rt.name AS room_name,
        SUM(b.total_price) AS total_revenue,
        RANK() OVER (PARTITION BY h.hotel_id ORDER BY SUM(b.total_price) DESC) AS room_rank,
        SUM(SUM(b.total_price)) OVER (PARTITION BY h.hotel_id) AS hotel_total
      FROM hotels h
      INNER JOIN room_types rt ON h.hotel_id = rt.hotel_id
      LEFT JOIN bookings b ON rt.room_type_id = b.room_type_id AND b.status = 'confirmed'
      ${whereClause}
      GROUP BY h.hotel_id, h.name, rt.room_type_id, rt.name
      ORDER BY h.hotel_id, room_rank
      `,
      hotelId ? [hotelId] : [],
    );
  }
}