'use client';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

interface NavItem {
  id: string;
  icon: string;
  label: string;
  badge?: string;
  badgeStyle?: string;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const navItems: { section: string; items: NavItem[] }[] = [
    {
      section: 'Tổng quan',
      items: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' }
      ]
    },
    {
      section: 'Auth & Users',
      items: [
        { id: 'auth', icon: '🔐', label: 'Đăng nhập / RBAC' },
        { id: 'users', icon: '👥', label: 'Quản lý người dùng', badge: '4' }
      ]
    },
    {
      section: 'Quản lý phòng',
      items: [
        { id: 'rooms', icon: '🛏️', label: 'Loại phòng' },
        { id: 'hotels', icon: '🏢', label: 'Chi nhánh khách sạn' }
      ]
    },
    {
      section: 'Định giá động',
      items: [
        { id: 'pricing', icon: '💰', label: 'Dynamic Pricing', badge: '2', badgeStyle: 'background:var(--gold);color:#000' },
        { id: 'history', icon: '📜', label: 'Price History' },
        { id: 'rules', icon: '⚙️', label: 'Pricing Rules' }
      ]
    },
    {
      section: 'Phân tích OLAP',
      items: [
        { id: 'reports', icon: '📈', label: 'Báo cáo doanh thu' },
        { id: 'occupancy', icon: '🎯', label: 'Occupancy Rate' }
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <div className="brand-icon">🏨</div>
          <div>
            <div className="brand-name">HotelPro</div>
            <div className="brand-sub">Smart Reservation</div>
          </div>
        </div>
        <div className="badge-tv3">⚡ Thành viên 3 — TV3</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section} className="nav-section">
            <div className="nav-label">{section.section}</div>
            {section.items.map((item) => (
              <a
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span> {item.label}
                {item.badge && (
                  <span className="nav-badge" style={item.badgeStyle ? { background: 'var(--gold)', color: '#000' } : undefined}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">DC</div>
          <div className="user-info">
            <div className="user-name">Dương Chí Chung</div>
            <span className="user-role">Admin — 52300011</span>
          </div>
          <span>⚙️</span>
        </div>
      </div>
    </aside>
  );
}