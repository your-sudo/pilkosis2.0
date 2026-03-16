import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, MapPin, Calendar, Clock, Type, Send } from 'lucide-react';

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  
  const [formData, setFormData] = useState({
    judul: '',
    start: '',
    end: '',
    time: '',
    location: '',
    type: 'Keagamaan'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Anda tidak memiliki akses (Token tidak ditemukan). Silahkan login kembali.');
      }

      const res = await fetch('http://${import.meta.env.VITE_API_URL}/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal menambahkan event');
      }

      setSuccess('Event berhasil ditambahkan!');
      setFormData({ judul: '', start: '', end: '', time: '', location: '', type: 'Keagamaan' });
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Token')) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '0.5rem', 
    fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.6rem', 
    color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  const getInputStyle = (name) => ({
    width: '100%', padding: '14px 16px', background: 'var(--bg-elevated)', 
    border: `1px solid ${focusedInput === name ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 12, color: 'var(--text-primary)', outline: 'none', 
    transition: 'all 0.3s ease', fontSize: '1rem', fontFamily: 'inherit',
    boxShadow: focusedInput === name ? '0 0 0 4px var(--accent-glow)' : 'none'
  });

  return (
    <div style={{ maxWidth: 850, margin: '0 auto', animation: 'fadeInUp 0.6s ease-out' }}>
      <div className="admin-header-spacing" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="admin-icon-box">
          <CalendarPlus size={24} color="#000" />
        </div>
        <div>
          <h1 className="admin-page-title">
            Tambah Event Baru
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: '0.25rem 0 0 0' }}>
            Isi formulir di bawah untuk mempublikasikan jadwal acara sekolah.
          </p>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255, 50, 50, 0.08)', color: '#ff3333', padding: '1rem 1.5rem',
          borderRadius: 12, marginBottom: '2rem', border: '1px solid rgba(255, 50, 50, 0.2)',
          display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600
        }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span> {error}
        </div>
      )}

      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', padding: '1rem 1.5rem',
          borderRadius: 12, marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600
        }}>
          <span style={{ fontSize: '1.25rem' }}>✨</span> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card-form">
        {/* Decorative blur */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '200px', height: '200px',
          background: 'var(--accent)', filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div>
          <label style={labelStyle}>
            <Type size={16} color="var(--accent)" /> Judul Event *
          </label>
          <input 
            type="text" name="judul" value={formData.judul} onChange={handleChange} required 
            style={getInputStyle('judul')} placeholder="Contoh: HUT Smenza ke 59"
            onFocus={() => setFocusedInput('judul')} onBlur={() => setFocusedInput('')}
          />
        </div>

        <div className="responsive-grid">
          <div>
            <label style={labelStyle}>
              <Calendar size={16} color="var(--accent)" /> Tanggal Mulai *
            </label>
            <input 
              type="date" name="start" value={formData.start} onChange={handleChange} required 
              style={getInputStyle('start')}
              onFocus={() => setFocusedInput('start')} onBlur={() => setFocusedInput('')}
            />
          </div>
          <div>
            <label style={labelStyle}>
              <Calendar size={16} color="var(--accent)" /> Tanggal Selesai
            </label>
            <input 
              type="date" name="end" value={formData.end} onChange={handleChange} 
              style={getInputStyle('end')}
              onFocus={() => setFocusedInput('end')} onBlur={() => setFocusedInput('')}
            />
          </div>
        </div>

        <div className="responsive-grid">
          <div>
            <label style={labelStyle}>
              <Clock size={16} color="var(--accent)" /> Waktu *
            </label>
            <input 
              type="text" name="time" value={formData.time} onChange={handleChange} required 
              style={getInputStyle('time')} placeholder="Contoh: 08:00 - Selesai"
              onFocus={() => setFocusedInput('time')} onBlur={() => setFocusedInput('')}
            />
          </div>
          <div>
            <label style={labelStyle}>
              <Type size={16} color="var(--accent)" /> Tipe / Kategori *
            </label>
            <select 
              name="type" value={formData.type} onChange={handleChange} 
              style={{...getInputStyle('type'), cursor: 'pointer'}}
              onFocus={() => setFocusedInput('type')} onBlur={() => setFocusedInput('')}
            >
              <option value="Keagamaan">Keagamaan</option>
              <option value="Olahraga">Olahraga</option>
              <option value="Seni">Seni</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            <MapPin size={16} color="var(--accent)" /> Lokasi *
          </label>
          <input 
            type="text" name="location" value={formData.location} onChange={handleChange} required 
            style={getInputStyle('location')} placeholder="Contoh: Indoor Utama"
            onFocus={() => setFocusedInput('location')} onBlur={() => setFocusedInput('')}
          />
        </div>

        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            disabled={loading} 
            style={{
              padding: '14px 32px', background: 'var(--accent)', color: '#000', border: 'none',
              borderRadius: 12, fontSize: '1.05rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: loading ? 'none' : '0 8px 16px var(--accent-glow)',
              transform: loading ? 'none' : 'translateY(-2px)'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          >
            {loading ? 'Menyimpan...' : (
              <>
                Simpan Event <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
