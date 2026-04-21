'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import Dashboard from '@/components/admin/pages/Dashboard';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'auth':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Đăng nhập / RBAC</h1>
              <p className="section-desc">Quản lý xác thực và phân quyền người dùng</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'users':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Quản lý người dùng</h1>
              <p className="section-desc">Quản lý tài khoản và quyền hạn</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'rooms':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Loại phòng</h1>
              <p className="section-desc">Quản lý các loại phòng và tiện nghi</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'hotels':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Chi nhánh khách sạn</h1>
              <p className="section-desc">Quản lý các khách sạn và địa điểm</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'pricing':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Dynamic Pricing</h1>
              <p className="section-desc">Quản lý định giá động và đề xuất giá</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'history':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Price History</h1>
              <p className="section-desc">Lịch sử thay đổi giá phòng</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'rules':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Pricing Rules</h1>
              <p className="section-desc">Cấu hình quy tắc định giá</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'reports':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Báo cáo doanh thu</h1>
              <p className="section-desc">Phân tích OLAP và báo cáo chi tiết</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      case 'occupancy':
        return <div className="page-section active">
          <div className="section-header">
            <div>
              <h1 className="section-title">Occupancy Rate</h1>
              <p className="section-desc">Tỷ lệ lấp đầy phòng theo thời gian</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p>Chức năng đang phát triển...</p>
            </div>
          </div>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="main">
        <Topbar />
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}