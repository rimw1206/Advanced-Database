import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0d13',
      padding: '48px 24px',
    }}>
      <LoginForm />
    </div>
  );
}