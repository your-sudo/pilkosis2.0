import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, CalendarPlus, LogOut, ShieldAlert, Menu, X } from 'lucide-react';

// Custom Link Component to handle hover state without external CSS
const NavLink = ({ item, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.25rem',
        borderRadius: 12, textDecoration: 'none', fontWeight: 600,
        background: isActive ? 'var(--accent)' : isHovered ? 'var(--accent-dim)' : 'transparent',
        color: isActive ? '#000' : isHovered ? 'var(--accent)' : 'var(--text-secondary)',
        border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered && !isActive ? 'translateX(5px)' : 'none'
      }}
    >
      <Icon size={20} style={{ 
        color: isActive ? '#000' : isHovered ? 'var(--accent)' : 'var(--text-secondary)',
        transition: 'color 0.3s ease'
      }} />
      <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
    </Link>
  );
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/add-news', icon: FileText, label: 'Tambah Berita' },
    { path: '/admin/add-event', icon: CalendarPlus, label: 'Tambah Event' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', background: 'var(--bg-base)' }}>
      
      {/* Mobile Top Navbar */}
      {isMobile && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem', background: 'var(--bg-card)', 
          borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow)',
          position: 'sticky', top: 0, zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, background: 'var(--accent)', borderRadius: 10, display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <ShieldAlert size={20} color="#000" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Admin Panel</h2>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          >
            {isMobileMenuOpen ? <X size={28} color="var(--text-primary)" /> : <Menu size={28} color="var(--text-primary)" />}
          </button>
        </div>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isMobileMenuOpen && (
        <div 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow)',
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 0 : 'auto',
        left: isMobile ? (isMobileMenuOpen ? 0 : '-100%') : 0,
        height: isMobile ? '100%' : 'auto',
        zIndex: 50,
        transition: 'left 0.3s ease-in-out'
      }}>
        {!isMobile && (
          <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '0.5rem' }}>
            <div style={{
              width: 48, height: 48, background: 'var(--accent)', borderRadius: 14, display: 'flex',
              alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px var(--accent-glow)'
            }}>
              <ShieldAlert size={24} color="#000" />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Admin Panel</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>Pilkosis 2.0</div>
            </div>
          </div>
        )}
        
        {isMobile && (
           <div style={{ marginBottom: '2rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-secondary)' }}>Menu Navigasi</h3>
               <button 
                onClick={closeMobileMenu}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} color="var(--text-secondary)" />
              </button>
           </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          {menuItems.map(item => (
            <NavLink key={item.path} item={item} isActive={location.pathname === item.path} onClick={isMobile ? closeMobileMenu : undefined} />
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)', zIndex: 60, position: 'relative' }}>
          <button
            onClick={handleLogout}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.25rem',
              width: '100%', borderRadius: 12, border: '1px solid transparent', 
              background: logoutHovered ? '#ff5555' : 'rgba(255, 50, 50, 0.08)',
              color: logoutHovered ? '#fff' : '#ff5555', 
              fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: logoutHovered ? 'translateY(-2px)' : 'none',
              boxShadow: logoutHovered ? '0 4px 12px rgba(255, 50, 50, 0.2)' : 'none'
            }}
          >
            <LogOut size={20} />
            <span style={{ fontSize: '0.95rem' }}>Keluar Akun</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: isMobile ? '2rem 1.5rem' : '3rem 4rem', overflowY: 'auto', background: 'var(--bg-base)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', animation: 'fadeInUp 0.5s ease-out' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
