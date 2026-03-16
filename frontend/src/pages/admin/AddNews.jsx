import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Type, AlignLeft, Send, Tag, User as UserIcon, Calendar, Bell } from 'lucide-react';

export default function AddNews() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    kategori: 'Pemberitahuan',
    authorName: '',
    isNewItem: true,
    tanggal: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal menambahkan berita');
      }

      setSuccess('Berita berhasil ditambahkan!');
      setFormData({
        judul: '',
        deskripsi: '',
        kategori: 'Pemberitahuan',
        authorName: '',
        isNewItem: true,
        tanggal: new Date().toISOString().split('T')[0]
      });
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
          <FileText size={24} color="#000" />
        </div>
        <div>
          <h1 className="admin-page-title">
            Publikasikan Berita
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: '0.25rem 0 0 0' }}>
            Buat pengumuman atau berita terbaru untuk membagikan informasi.
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
            <Type size={16} color="var(--accent)" /> Judul Berita *
          </label>
          <input 
            type="text" name="judul" value={formData.judul} onChange={handleChange} required 
            style={getInputStyle('judul')} placeholder="Kegiatan .... berjalan lancar!"
            onFocus={() => setFocusedInput('judul')} onBlur={() => setFocusedInput('')}
          />
        </div>

        <div>
           <label style={labelStyle}>
            <AlignLeft size={16} color="var(--accent)" /> Deskripsi / Isi Berita *
          </label>
          <textarea 
            name="deskripsi" 
            value={formData.deskripsi} 
            onChange={handleChange} 
            required 
            style={{ ...getInputStyle('deskripsi'), minHeight: '180px', resize: 'vertical', lineHeight: 1.6 }} 
            placeholder="Tuliskan detail lengkap informasi di sini..." 
            onFocus={() => setFocusedInput('deskripsi')} onBlur={() => setFocusedInput('')}
          />
        </div>

        <div className="responsive-grid">
          <div>
            <label style={labelStyle}>
              <Tag size={16} color="var(--accent)" /> Kategori *
            </label>
            <select 
              name="kategori" value={formData.kategori} onChange={handleChange} 
              style={{...getInputStyle('kategori'), cursor: 'pointer'}}
              onFocus={() => setFocusedInput('kategori')} onBlur={() => setFocusedInput('')}
            >
              <option value="Pemberitahuan">Pemberitahuan</option>
              <option value="Berita Acara">Berita Acara</option>
              <option value="Pencapaian">Pencapaian</option>
            </select>
          </div>
          <div>
             <label style={labelStyle}>
              <UserIcon size={16} color="var(--accent)" /> Penulis *
            </label>
            <input 
              type="text" name="authorName" value={formData.authorName} onChange={handleChange} required 
              style={getInputStyle('authorName')} placeholder="Contoh: Sekbid 9"
              onFocus={() => setFocusedInput('authorName')} onBlur={() => setFocusedInput('')}
            />
          </div>
        </div>
        
        <div className="responsive-grid" style={{ alignItems: 'center' }}>
          <div>
            <label style={labelStyle}>
              <Calendar size={16} color="var(--accent)" /> Tanggal *
            </label>
            <input 
              type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} required 
              style={getInputStyle('tanggal')}
              onFocus={() => setFocusedInput('tanggal')} onBlur={() => setFocusedInput('')}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.8rem', padding: '14px 16px', background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontWeight: 700, color: 'var(--text-secondary)', width: '100%' }}>
              <Bell size={20} color="var(--accent)" />
              <div style={{ flex: 1 }}>
                Tandai sebagai 'Terbaru'
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Akan memunculkan badge NEW</span>
              </div>
              <input 
                type="checkbox" 
                name="isNewItem" 
                checked={formData.isNewItem} 
                onChange={handleChange} 
                style={{ width: '22px', height: '22px', accentColor: 'var(--accent)', cursor: 'pointer' }} 
              />
            </label>
          </div>
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
            {loading ? 'Memproses...' : (
               <>
                Publikasikan <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
