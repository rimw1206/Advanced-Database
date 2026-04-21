'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      // Handle success
      const token = response.data.access_token || response.data.token;
      if (formData.rememberMe) {
        localStorage.setItem('luxe_token', token);
      } else {
        sessionStorage.setItem('luxe_token', token);
      }
      alert('Đăng nhập thành công!');
      // Redirect to dashboard
      window.location.href = '/auth/dashboard';
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrors({ password: 'Email hoặc mật khẩu không đúng' });
      } else {
        alert('Lỗi đăng nhập: ' + (error.response?.data?.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    const input = document.getElementById('password') as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <div className="auth-form">
      <div className="form-header">
        <h2 className="form-title">Chào mừng trở lại 👋</h2>
        <p className="form-subtitle">Đăng nhập để quản lý đặt phòng của bạn</p>
      </div>

      {/* Social login */}
      <div className="social-btns">
        <button className="social-btn" onClick={() => alert('Đăng nhập bằng Google - đang phát triển')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button className="social-btn" onClick={() => alert('Đăng nhập bằng Facebook - đang phát triển')}>
          <svg viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>

      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-text">hoặc đăng nhập bằng email</span>
        <div className="divider-line"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <span className="input-icon">✉</span>
          </div>
          {errors.email && <div className="field-error show">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <div className="input-wrap">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <span className="input-icon">🔒</span>
            <button type="button" className="password-toggle" onClick={togglePassword}>👁</button>
          </div>
          {errors.password && <div className="field-error show">{errors.password}</div>}
        </div>

        <div className="options-row">
          <label className="checkbox-wrap">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span className="checkbox-label">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Quên mật khẩu - đang phát triển'); }}>Quên mật khẩu?</a>
        </div>

        <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`}>
          <div className="spinner"></div>
          <span className="btn-label">Đăng nhập →</span>
        </button>
      </form>
    </div>
  );
}