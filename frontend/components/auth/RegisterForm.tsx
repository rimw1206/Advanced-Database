'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState({ score: 0, show: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (name === 'password') {
      checkStrength(value);
    }
  };

  const checkStrength = (val: string) => {
    if (!val) {
      setStrength({ score: 0, show: false });
      return;
    }
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setStrength({ score, show: true });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Vui lòng nhập họ';
    if (!formData.lastName.trim()) newErrors.lastName = 'Vui lòng nhập tên';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (formData.phone && !/^(0|\+84)[0-9]{9,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0901 234 567)';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let payload: any = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      };
      if (formData.phone) payload.phone = formData.phone;

      const response = await api.post('/auth/register', payload);
      alert('Đăng ký thành công!');
      // Redirect to login
      window.location.href = '/auth/login';
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrors({ email: 'Email này đã được đăng ký' });
      } else {
        alert('Lỗi đăng ký: ' + (error.response?.data?.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = (field: string) => {
    const input = document.getElementById(field) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  const strengthLabels = ['Quá yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  const strengthColors = ['var(--danger)', 'var(--danger)', 'var(--gold)', 'var(--success)', 'var(--success)'];

  return (
    <div className="auth-form">
      <div className="form-header">
        <h2 className="form-title">Tạo tài khoản</h2>
        <p className="form-subtitle">Miễn phí — Tận hưởng ưu đãi thành viên ngay</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-row">
            <div>
              <label htmlFor="firstName">Họ</label>
              <div className="input-wrap">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nguyễn"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                <span className="input-icon">👤</span>
              </div>
              {errors.firstName && <div className="field-error show">{errors.firstName}</div>}
            </div>
            <div>
              <label htmlFor="lastName">Tên</label>
              <div className="input-wrap">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Văn A"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
                <span className="input-icon">👤</span>
              </div>
              {errors.lastName && <div className="field-error show">{errors.lastName}</div>}
            </div>
          </div>
        </div>

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
          <label htmlFor="phone">Số điện thoại</label>
          <div className="input-wrap">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="0901 234 567"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            <span className="input-icon">📱</span>
          </div>
          {errors.phone && <div className="field-error show">{errors.phone}</div>}
          <div className="field-hint">Dùng để nhận xác nhận đặt phòng qua SMS</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <div className="input-wrap">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tối thiểu 8 ký tự"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span className="input-icon">🔒</span>
            <button type="button" className="password-toggle" onClick={() => togglePassword('password')}>👁</button>
          </div>
          {errors.password && <div className="field-error show">{errors.password}</div>}
          <div className={`strength-meter ${strength.show ? 'show' : ''}`}>
            <div className="strength-bars">
              {[1,2,3,4].map(i => (
                <div key={i} className={`strength-bar ${i <= strength.score ? (strength.score <= 1 ? 'weak' : strength.score <= 2 ? 'medium' : 'strong') : ''}`}></div>
              ))}
            </div>
            <span className="strength-text" style={{ color: strengthColors[strength.score] || 'var(--text3)' }}>
              {strengthLabels[strength.score] || 'Nhập mật khẩu'}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <div className="input-wrap">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span className="input-icon">🔒</span>
            <button type="button" className="password-toggle" onClick={() => togglePassword('confirmPassword')}>👁</button>
          </div>
          {errors.confirmPassword && <div className="field-error show">{errors.confirmPassword}</div>}
        </div>

        <p className="terms-text">
          Bằng cách đăng ký, bạn đồng ý với
          <a href="#"> Điều khoản sử dụng</a> và
          <a href="#"> Chính sách bảo mật</a> của chúng tôi.
        </p>

        <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`}>
          <div className="spinner"></div>
          <span className="btn-label">Tạo tài khoản →</span>
        </button>
      </form>
    </div>
  );
}