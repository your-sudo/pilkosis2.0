import { Activity, Clock, Users, Database, Trash2, FileText, Calendar as CalendarIcon, MapPin, Edit2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MetricCard = ({ title, value, icon: Icon, color, delay }) => (
  // ... (keep same)
  <div style={{
    background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 20,
    border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    animation: `fadeInUp 0.6s ease-out ${delay}s both`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 12px 24px var(--accent-dim)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'var(--shadow)';
  }}
  >
    <div>
      <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
        {value}
      </p>
    </div>
    <div style={{
      width: 48, height: 48, borderRadius: 14, background: `${color}15`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${color}30`
    }}>
      <Icon size={24} color={color} />
    </div>
  </div>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, itemType }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'var(--bg-card)', padding: '2rem', borderRadius: 24, width: '90%', maxWidth: '400px',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow)', animation: 'slideInUp 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 48, height: 48, background: 'rgba(255, 50, 50, 0.1)', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff3333'
          }}>
            <Trash2 size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            Hapus {itemType}?
          </h3>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Tindakan ini tidak dapat dibatalkan. Data {itemType} akan dihapus secara permanen dari sistem.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '10px 20px', borderRadius: 12, border: 'none', background: 'var(--bg-elevated)',
            color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
          }} onMouseEnter={e => e.currentTarget.style.background = 'var(--border-bright)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-elevated)'}>
            Batal
          </button>
          <button onClick={onConfirm} style={{
            padding: '10px 20px', borderRadius: 12, border: 'none', background: '#ff3333',
            color: '#fff', fontWeight: 600, cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s'
          }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,50,50,0.3)'; }} 
             onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, onSave, itemType, initialData }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (itemType === 'Event') {
        const s = new Date(initialData.start);
        const e = initialData.end ? new Date(initialData.end) : s;
        setFormData({
          ...initialData,
          start: s.toISOString().split('T')[0],
          end: e.toISOString().split('T')[0]
        });
      } else {
        const t = new Date(initialData.tanggal);
        setFormData({
          ...initialData,
          tanggal: t.toISOString().split('T')[0]
        });
      }
    }
  }, [initialData, itemType]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    borderRadius: 8, color: 'var(--text-primary)', outline: 'none', marginBottom: '1rem', fontFamily: 'inherit'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'var(--bg-card)', padding: '2rem', borderRadius: 24, width: '90%', maxWidth: '500px',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow)', animation: 'slideInUp 0.3s ease-out',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            Edit {itemType}
          </h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24}/></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {itemType === 'Berita' ? (
            <>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Judul</label>
              <input type="text" name="judul" value={formData.judul || ''} onChange={handleChange} required style={inputStyle} />
              
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Deskripsi</label>
              <textarea name="deskripsi" value={formData.deskripsi || ''} onChange={handleChange} required style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
              
              <div style={{display: 'flex', gap: '1rem'}}>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Kategori</label>
                    <select name="kategori" value={formData.kategori || ''} onChange={handleChange} style={inputStyle}>
                      <option value="Pemberitahuan">Pemberitahuan</option>
                      <option value="Berita Acara">Berita Acara</option>
                      <option value="Pencapaian">Pencapaian</option>
                    </select>
                 </div>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Penulis</label>
                    <input type="text" name="authorName" value={formData.authorName || ''} onChange={handleChange} required style={inputStyle} />
                 </div>
              </div>
              
              <div style={{display: 'flex', gap: '1rem'}}>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tanggal</label>
                    <input type="date" name="tanggal" value={formData.tanggal || ''} onChange={handleChange} required style={inputStyle} />
                 </div>
              </div>
            </>
          ) : (
             <>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Judul Event</label>
              <input type="text" name="judul" value={formData.judul || ''} onChange={handleChange} required style={inputStyle} />
              
              <div style={{display: 'flex', gap: '1rem'}}>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tanggal Mulai</label>
                    <input type="date" name="start" value={formData.start || ''} onChange={handleChange} required style={inputStyle} />
                 </div>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tanggal Selesai</label>
                    <input type="date" name="end" value={formData.end || ''} onChange={handleChange} style={inputStyle} />
                 </div>
              </div>

              <div style={{display: 'flex', gap: '1rem'}}>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Waktu</label>
                    <input type="text" name="time" value={formData.time || ''} onChange={handleChange} required style={inputStyle} />
                 </div>
                 <div style={{flex: 1}}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tipe</label>
                    <select name="type" value={formData.type || ''} onChange={handleChange} style={inputStyle}>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Seni">Seni</option>
                    </select>
                 </div>
              </div>

              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Lokasi</label>
              <input type="text" name="location" value={formData.location || ''} onChange={handleChange} required style={inputStyle} />
            </>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" disabled={loading} style={{
              padding: '12px 24px', borderRadius: 12, border: 'none', background: 'var(--accent)',
              color: '#000', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'box-shadow 0.2s',
              boxShadow: '0 4px 12px var(--accent-glow)'
            }}>
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const [newsList, setNewsList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: '', id: null });
  const [editModal, setEditModal] = useState({ isOpen: false, type: '', data: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [newsRes, eventsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/news`),
        fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      ]);

      if (!newsRes.ok || !eventsRes.ok) throw new Error('Gagal mengambil data dari server');
      
      const newsData = await newsRes.json();
      const eventsData = await eventsRes.json();
      
      setNewsList(newsData);
      setEventList(eventsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerDelete = (type, id) => {
    setDeleteModal({ isOpen: true, type, id });
  };

  const confirmDelete = async () => {
    const { type, id } = deleteModal;
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const endpoint = type === 'Berita' ? 'news' : 'events';
      const res = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Gagal menghapus data');
      }

      setDeleteModal({ isOpen: false, type: '', id: null });
      fetchData();
    } catch (err) {
      alert(err.message);
      setDeleteModal({ isOpen: false, type: '', id: null });
    }
  };

  const handleSaveEdit = async (updatedData) => {
    const { type, data } = editModal;
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/login'); return;
      }
      const endpoint = type === 'Berita' ? 'news' : 'events';
      const res = await fetch(`http://localhost:3000/api/${endpoint}/${data._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Gagal mengupdate data');
      }
      setEditModal({ isOpen: false, type: '', data: null });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <ConfirmModal 
        isOpen={deleteModal.isOpen} 
        itemType={deleteModal.type} 
        onClose={() => setDeleteModal({ isOpen: false, type: '', id: null })}
        onConfirm={confirmDelete} 
      />
      <EditModal 
        isOpen={editModal.isOpen} 
        itemType={editModal.type}
        initialData={editModal.data}
        onClose={() => setEditModal({ isOpen: false, type: '', data: null })}
        onSave={handleSaveEdit} 
      />
      <div>
        <div className="admin-header-spacing" style={{ marginBottom: '2.5rem' }}>
          <h1 className="admin-page-title" style={{ marginBottom: '0.25rem' }}>
            Overview Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Pantau statistik dan kelola konten sistem Pilkosis 2.0.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 50, 50, 0.1)', color: '#ff3333', padding: '1rem', borderRadius: 12, marginBottom: '2rem' }}>
            {error}
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
          <MetricCard title="Status Sistem" value="Online" icon={Activity} color="#10b981" delay={0.1} />
          <MetricCard title="Total Event" value={isLoading ? '...' : eventList.length} icon={Database} color="#f59e0b" delay={0.2} />
          <MetricCard title="Total Berita" value={isLoading ? '...' : newsList.length} icon={Users} color="#8b5cf6" delay={0.3} />
        </div>
        
        {/* Konten Berita */}
        <div className="admin-header-spacing" style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both', marginBottom: '3rem' }}>
          <h2 className="admin-page-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={24} color="var(--accent)" /> Kelola Berita
          </h2>
          
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Memuat data berita...</p>
          ) : newsList.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 16, textAlign: 'center', border: '1px dashed var(--border)', color: 'var(--text-secondary)' }}>
              Belum ada berita yang dipublikasikan.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {newsList.map(news => (
                <div key={news._id} style={{
                  background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 16, border: '1px solid var(--border)', 
                  boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--accent-dim)', color: 'var(--accent)', padding: '4px 10px', borderRadius: 20 }}>
                      {news.kategori}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setEditModal({ isOpen: true, type: 'Berita', data: news })}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--blue)', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(74, 143, 240, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Edit Berita"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => triggerDelete('Berita', news._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff5555', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 85, 85, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Hapus Berita"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.4 }}>{news.judul}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {news.deskripsi}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Users size={14} /> {news.authorName}</span>
                    <span>{new Date(news.tanggal).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Konten Event */}
        <div className="admin-header-spacing" style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
          <h2 className="admin-page-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CalendarIcon size={24} color="var(--accent)" /> Kelola Event
          </h2>
          
          {isLoading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Memuat data event...</p>
          ) : eventList.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 16, textAlign: 'center', border: '1px dashed var(--border)', color: 'var(--text-secondary)' }}>
              Belum ada event yang dijadwalkan.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {eventList.map(event => (
                <div key={event._id} style={{
                  background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 16, border: '1px solid var(--border)', 
                  boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CalendarIcon size={16} color="var(--accent)" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {new Date(event.start).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setEditModal({ isOpen: true, type: 'Event', data: event })}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--blue)', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(74, 143, 240, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Edit Event"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => triggerDelete('Event', event._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff5555', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 85, 85, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Hapus Event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>{event.judul}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <Clock size={16} /> <span>{event.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <MapPin size={16} /> <span>{event.location}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
