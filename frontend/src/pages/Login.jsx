import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nis, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, background: 'var(--accent)', borderRadius: 12, display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
          }}>
            <span style={{ fontSize: 24 }}>🔒</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800 }}>Login Admin</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Akses terenkripsi ke Dashboard Pilkosis</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 50, 50, 0.1)', color: '#ff5555', padding: '0.75rem',
            borderRadius: 8, fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid rgba(255, 50, 50, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              NIS 
            </label>
            <input
              type="text"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              placeholder='Masukan NIS'
              required
              style={{
                width: '100%', padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 8, color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s', fontSize: '1rem'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 8, color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s', fontSize: '1rem'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', background: 'var(--accent)', color: '#0a0a0f', border: 'none',
              borderRadius: 8, fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem', transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a href="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
              ← Kembali 
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
