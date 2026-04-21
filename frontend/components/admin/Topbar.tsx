'use client';

import { useState } from 'react';

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">Dashboard</h1>
        <div className="page-breadcrumb">
          <span>Admin</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Dashboard</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn" onClick={() => setShowNotifications(!showNotifications)}>
          🔔
          <span className="notif-dot"></span>
        </button>
        <div className="user-card">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="notif-panel" style={{ display: 'block' }}>
          <div className="notif-header">
            <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 500, cursor: 'pointer' }}>Đọc tất cả</span>
          </div>
          <div className="notif-item">
            <div className="notif-dot2" style={{ background: 'var(--danger)' }}></div>
            <div className="notif-text">
              <strong style={{ color: 'var(--text)' }}>⚠️ Alert!</strong> Phòng Suite HN tăng giá 62% — vượt ngưỡng 50%
            </div>
          </div>
          <div className="notif-item">
            <div className="notif-dot2" style={{ background: 'var(--gold)' }}></div>
            <div className="notif-text">
              <strong style={{ color: 'var(--text)' }}>💰 Pricing</strong> Giá phòng Deluxe được cập nhật tự động
            </div>
          </div>
          <div className="notif-item">
            <div className="notif-dot2" style={{ background: 'var(--success)' }}></div>
            <div className="notif-text">
              <strong style={{ color: 'var(--text)' }}>✅ Booking</strong> Đặt phòng thành công cho khách VIP
            </div>
          </div>
        </div>
      )}
    </header>
  );
}