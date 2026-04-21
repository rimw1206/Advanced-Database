// ═══════════════════════════════════════════════════
// API CLIENT — connects to NestJS backend
// Falls back to mock data if backend unreachable
// ═══════════════════════════════════════════════════

import {
  MOCK_USERS, MOCK_HOTELS, MOCK_ROOM_TYPES, MOCK_BOOKINGS,
  MOCK_PRICE_HISTORY, MOCK_ANALYTICS, MOCK_PRICING_RULES, delay,
} from './mockData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// ── Token helpers ──
const TOKEN_KEY   = 'luxestay_token';
const REFRESH_KEY = 'luxestay_refresh';
const USER_KEY    = 'luxestay_user';

export const tokenStore = {
  get: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },
  set: (token: string, remember = false) => {
    if (remember) localStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.setItem(TOKEN_KEY, token);
  },
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user: object, remember = false) => {
    const s = JSON.stringify(user);
    if (remember) localStorage.setItem(USER_KEY, s);
    else sessionStorage.setItem(USER_KEY, s);
  },
  clear: () => {
    [TOKEN_KEY, REFRESH_KEY, USER_KEY].forEach(k => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  },
};

// ── Base HTTP ──
async function http<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStore.get();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw Object.assign(new Error(err.message || 'API Error'), { status: res.status });
  }
  return res.json();
}

// ═══════════════════════════════════════════════════
// AUTH API
// ═══════════════════════════════════════════════════
export const authApi = {
  login: async (email: string, password: string) => {
    if (USE_MOCK) {
      await delay(800);
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user || password !== 'admin123') {
        throw Object.assign(new Error('Email hoặc mật khẩu không đúng'), { status: 401 });
      }
      return { access_token: 'mock_jwt_token_' + user.user_id, user };
    }
    return http<{ access_token: string; user: object }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (payload: {
    full_name: string; email: string; password: string; phone?: string; role?: string;
  }) => {
    if (USE_MOCK) {
      await delay(1000);
      const exists = MOCK_USERS.find(u => u.email === payload.email);
      if (exists) throw Object.assign(new Error('Email đã tồn tại'), { status: 409 });
      return { message: 'Đăng ký thành công' };
    }
    return http('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
  },

  me: async () => {
    if (USE_MOCK) {
      await delay(300);
      return tokenStore.getUser();
    }
    return http('/auth/me');
  },

  logout: () => tokenStore.clear(),
};

// ═══════════════════════════════════════════════════
// USERS API
// ═══════════════════════════════════════════════════
export const usersApi = {
  getAll: async (params?: { role?: string; page?: number; limit?: number }) => {
    if (USE_MOCK) {
      await delay();
      let data = [...MOCK_USERS];
      if (params?.role) data = data.filter(u => u.role === params.role);
      return { data, total: data.length, page: 1, limit: 20 };
    }
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return http(`/users${q ? '?' + q : ''}`);
  },

  getById: async (id: string) => {
    if (USE_MOCK) {
      await delay(300);
      return MOCK_USERS.find(u => u.user_id === id) || null;
    }
    return http(`/users/${id}`);
  },

  create: async (payload: Partial<typeof MOCK_USERS[0]>) => {
    if (USE_MOCK) {
      await delay(600);
      return { ...payload, user_id: 'u' + Date.now(), created_at: new Date().toISOString() };
    }
    return http('/users', { method: 'POST', body: JSON.stringify(payload) });
  },

  update: async (id: string, payload: Partial<typeof MOCK_USERS[0]>) => {
    if (USE_MOCK) {
      await delay(500);
      return { success: true };
    }
    return http(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  },

  delete: async (id: string) => {
    if (USE_MOCK) {
      await delay(400);
      return { success: true };
    }
    return http(`/users/${id}`, { method: 'DELETE' });
  },
};

// ═══════════════════════════════════════════════════
// HOTELS API
// ═══════════════════════════════════════════════════
export const hotelsApi = {
  getAll: async () => {
    if (USE_MOCK) {
      await delay();
      return { data: MOCK_HOTELS, total: MOCK_HOTELS.length };
    }
    return http('/hotels');
  },

  getById: async (id: string) => {
    if (USE_MOCK) {
      await delay(300);
      return MOCK_HOTELS.find(h => h.hotel_id === id) || null;
    }
    return http(`/hotels/${id}`);
  },
};

// ═══════════════════════════════════════════════════
// ROOMS API
// ═══════════════════════════════════════════════════
export const roomsApi = {
  getAll: async (hotelId?: string) => {
    if (USE_MOCK) {
      await delay();
      const data = hotelId ? MOCK_ROOM_TYPES.filter(r => r.hotel_id === hotelId) : MOCK_ROOM_TYPES;
      return { data, total: data.length };
    }
    return http(`/rooms${hotelId ? '?hotelId=' + hotelId : ''}`);
  },

  create: async (payload: Partial<typeof MOCK_ROOM_TYPES[0]>) => {
    if (USE_MOCK) {
      await delay(700);
      return { ...payload, room_type_id: 'rt' + Date.now() };
    }
    return http('/rooms', { method: 'POST', body: JSON.stringify(payload) });
  },

  update: async (id: string, payload: Partial<typeof MOCK_ROOM_TYPES[0]>) => {
    if (USE_MOCK) {
      await delay(500);
      return { success: true };
    }
    return http(`/rooms/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  },
};

// ═══════════════════════════════════════════════════
// BOOKINGS API
// ═══════════════════════════════════════════════════
export const bookingsApi = {
  getAll: async (params?: { status?: string; userId?: string }) => {
    if (USE_MOCK) {
      await delay();
      let data = [...MOCK_BOOKINGS];
      if (params?.status) data = data.filter(b => b.status === params.status);
      if (params?.userId) data = data.filter(b => b.user_id === params.userId);
      return { data, total: data.length };
    }
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return http(`/bookings${q ? '?' + q : ''}`);
  },

  create: async (payload: Partial<typeof MOCK_BOOKINGS[0]>) => {
    if (USE_MOCK) {
      await delay(900);
      return { ...payload, booking_id: 'bk' + Date.now(), status: 'pending', created_at: new Date().toISOString() };
    }
    return http('/bookings', { method: 'POST', body: JSON.stringify(payload) });
  },

  updateStatus: async (id: string, status: string) => {
    if (USE_MOCK) {
      await delay(400);
      return { success: true };
    }
    return http(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
  },
};

// ═══════════════════════════════════════════════════
// PRICING API
// ═══════════════════════════════════════════════════
export const pricingApi = {
  getHistory: async (roomTypeId?: string) => {
    if (USE_MOCK) {
      await delay();
      const data = roomTypeId
        ? MOCK_PRICE_HISTORY.filter(p => p.room_type_id === roomTypeId)
        : MOCK_PRICE_HISTORY;
      return { data, total: data.length };
    }
    return http(`/pricing/history${roomTypeId ? '?roomTypeId=' + roomTypeId : ''}`);
  },

  getRules: async () => {
    if (USE_MOCK) {
      await delay(400);
      return { data: MOCK_PRICING_RULES };
    }
    return http('/pricing/rules');
  },

  updatePrice: async (roomTypeId: string, newPrice: number, reason: string) => {
    if (USE_MOCK) {
      await delay(700);
      const room = MOCK_ROOM_TYPES.find(r => r.room_type_id === roomTypeId);
      const oldPrice = room?.base_price || 0;
      const pct = ((newPrice - oldPrice) / oldPrice) * 100;
      return {
        success: true,
        alert_flag: Math.abs(pct) >= 50,
        message: Math.abs(pct) >= 50
          ? `⚠️ Giá cập nhật! alert_flag = 1 vì biến động ${pct.toFixed(1)}% > 50%`
          : '✓ Trigger ghi price_history thành công',
      };
    }
    return http('/pricing/update', {
      method: 'POST',
      body: JSON.stringify({ roomTypeId, newPrice, reason }),
    });
  },

  getSuggestion: async (roomTypeId: string) => {
    if (USE_MOCK) {
      await delay(1200);
      const room = MOCK_ROOM_TYPES.find(r => r.room_type_id === roomTypeId);
      if (!room) throw new Error('Room not found');
      const suggested = Math.round(room.base_price * 1.08);
      return {
        current_price: room.base_price,
        suggested_price: suggested,
        change_pct: 8.0,
        reasoning: 'Occupancy rate hiện tại > 75%. Áp dụng High Occupancy Rule (+8%).',
        confidence: 87,
      };
    }
    return http(`/pricing/suggest?roomTypeId=${roomTypeId}`);
  },
};

// ═══════════════════════════════════════════════════
// ANALYTICS API
// ═══════════════════════════════════════════════════
export const analyticsApi = {
  getDashboard: async () => {
    if (USE_MOCK) {
      await delay(600);
      return MOCK_ANALYTICS;
    }
    return http('/analytics/dashboard');
  },

  getOccupancy: async (hotelId?: string) => {
    if (USE_MOCK) {
      await delay(500);
      return {
        data: MOCK_HOTELS.map(h => ({
          hotel_id: h.hotel_id,
          hotel_name: h.name,
          occupancy_rate: h.occupancy_rate,
          total_rooms: h.total_rooms,
          occupied: Math.round(h.total_rooms * h.occupancy_rate / 100),
        })),
      };
    }
    return http(`/analytics/occupancy${hotelId ? '?hotelId=' + hotelId : ''}`);
  },

  getRevenue: async (period: 'week' | 'month' | 'year' = 'month') => {
    if (USE_MOCK) {
      await delay(600);
      return { data: MOCK_ANALYTICS.monthly_revenue, period };
    }
    return http(`/analytics/revenue?period=${period}`);
  },
};

// Health check
export const checkApiHealth = async (): Promise<boolean> => {
  if (USE_MOCK) return false; // mock mode = backend offline
  try {
    await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    return true;
  } catch {
    return false;
  }
};