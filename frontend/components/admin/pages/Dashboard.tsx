'use client';

export default function Dashboard() {
  return (
    <div className="page-section active">
      {/* METRICS */}
      <div className="metrics-grid">
        <div className="metric-card gold">
          <div className="metric-icon gold">💰</div>
          <div className="metric-value">₫2.84B</div>
          <div className="metric-label">Tổng doanh thu Q1/2025</div>
          <div className="metric-trend">
            <span className="trend-up">▲ 18.3%</span>
            <span className="trend-label">so với Q4/2024</span>
          </div>
        </div>
        <div className="metric-card blue">
          <div className="metric-icon blue">🏠</div>
          <div className="metric-value">73.4%</div>
          <div className="metric-label">Occupancy Rate trung bình</div>
          <div className="metric-trend">
            <span className="trend-up">▲ 5.2%</span>
            <span className="trend-label">vs tháng trước</span>
          </div>
        </div>
        <div className="metric-card green">
          <div className="metric-icon green">📊</div>
          <div className="metric-value">847</div>
          <div className="metric-label">Lượt đặt phòng tháng này</div>
          <div className="metric-trend">
            <span className="trend-up">▲ 12.7%</span>
            <span className="trend-label">vs tháng trước</span>
          </div>
        </div>
        <div className="metric-card red">
          <div className="metric-icon red">⚠️</div>
          <div className="metric-value">3</div>
          <div className="metric-label">Cảnh báo giá vượt ngưỡng</div>
          <div className="metric-trend">
            <span className="trend-neutral">—</span>
            <span className="trend-label">cần kiểm tra</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid-60-40" style={{ marginTop: '28px' }}>
        {/* LEFT COLUMN */}
        <div>
          {/* REVENUE CHART */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-title-icon" style={{ background: 'rgba(240,165,0,0.15)' }}>📈</div>
                Doanh thu theo tháng
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <div className="bar-chart">
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '60%' }}></div>
                    <div className="bar-label">T1</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '75%' }}></div>
                    <div className="bar-label">T2</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '85%' }}></div>
                    <div className="bar-label">T3</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '95%' }}></div>
                    <div className="bar-label">T4</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '100%' }}></div>
                    <div className="bar-label">T5</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-gold" style={{ height: '90%' }}></div>
                    <div className="bar-label">T6</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP ROOMS */}
          <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-header">
              <div className="card-title">
                <div className="card-title-icon" style={{ background: 'rgba(79,135,255,0.15)' }}>🏆</div>
                Top phòng bán chạy
              </div>
            </div>
            <div className="card-body">
              <div className="top-room">
                <div className="rank-badge rank-1">1</div>
                <div className="room-info">
                  <div className="room-name">Suite President</div>
                  <div className="room-hotel">Hotel Grand HN</div>
                </div>
                <div className="room-revenue">
                  <div className="revenue-value">₫847M</div>
                  <div className="revenue-label">doanh thu</div>
                </div>
              </div>
              <div className="top-room">
                <div className="rank-badge rank-2">2</div>
                <div className="room-info">
                  <div className="room-name">Deluxe Ocean View</div>
                  <div className="room-hotel">Hotel Marina SG</div>
                </div>
                <div className="room-revenue">
                  <div className="revenue-value">₫623M</div>
                  <div className="revenue-label">doanh thu</div>
                </div>
              </div>
              <div className="top-room">
                <div className="rank-badge rank-3">3</div>
                <div className="room-info">
                  <div className="room-name">Executive Suite</div>
                  <div className="room-hotel">Hotel Central DN</div>
                </div>
                <div className="room-revenue">
                  <div className="revenue-value">₫489M</div>
                  <div className="revenue-label">doanh thu</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* OCCUPANCY METER */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-title-icon" style={{ background: 'rgba(0,200,150,0.15)' }}>🎯</div>
                Occupancy Rate
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div className="occupancy-ring">
                  <svg className="ring-svg" width="110" height="110">
                    <circle className="ring-bg" cx="55" cy="55" r="45" />
                    <circle
                      className="ring-fill ring-green"
                      cx="55"
                      cy="55"
                      r="45"
                      strokeDasharray={`${73.4 * 2.827} 283`}
                    />
                  </svg>
                  <div className="ring-text">
                    <div className="ring-pct">73.4%</div>
                    <div className="ring-label">OCCUPANCY</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="stat-row">
                    <span className="stat-key">Hôm nay</span>
                    <span className="stat-val">78.2%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-key">Tuần này</span>
                    <span className="stat-val">74.8%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-key">Tháng này</span>
                    <span className="stat-val">73.4%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-key">Mục tiêu</span>
                    <span className="stat-val">75.0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ALERTS */}
          <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-header">
              <div className="card-title">
                <div className="card-title-icon" style={{ background: 'rgba(255,77,109,0.15)' }}>⚠️</div>
                Cảnh báo hệ thống
              </div>
            </div>
            <div className="card-body">
              <div className="alert-box alert-danger">
                <div className="alert-icon">⚠️</div>
                <div>
                  <strong>Giá phòng Suite HN vượt ngưỡng 50%</strong><br />
                  Tăng 62% so với giá gốc. Cần kiểm tra lại quy tắc định giá.
                </div>
              </div>
              <div className="alert-box alert-warning">
                <div className="alert-icon">📊</div>
                <div>
                  <strong>Occupancy Rate thấp</strong><br />
                  Khách sạn Đà Nẵng chỉ đạt 45% trong tuần qua.
                </div>
              </div>
            </div>
          </div>

          {/* PRICING SUGGESTIONS */}
          <div className="suggestion-box">
            <div className="suggestion-header">
              <div className="suggestion-title">
                💡 <span>Đề xuất Dynamic Pricing</span>
              </div>
            </div>
            <div className="suggestion-prices">
              <div>
                <div className="sug-price-label">Giá hiện tại</div>
                <div className="sug-price sug-current">₫2,850,000</div>
              </div>
              <div className="sug-arrow">→</div>
              <div>
                <div className="sug-price-label">Đề xuất</div>
                <div className="sug-price sug-new">₫3,250,000</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text2)' }}>
              Dựa trên: Occupancy 87%, Demand cao, Competitor pricing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}