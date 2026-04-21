import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0d13',
      padding: '48px 24px',
    }}>
      <RegisterForm />
    </div>
  );
}