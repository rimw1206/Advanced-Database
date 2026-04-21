import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HotelPro — Smart Reservation System',
  description: 'Hệ thống quản lý đặt phòng khách sạn thông minh với Dynamic Pricing và Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}