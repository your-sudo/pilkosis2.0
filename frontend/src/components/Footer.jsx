import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="about">
      <div className="footer__grid">
        <div>
          <div className="footer__brand-logo">
            <span className="footer__brand-logo-icon">🎓</span>
            OSIS Smenza
          </div>
          <p className="footer__brand-desc">
            Organisasi Siswa Intra Sekolah resmi yang mewakili setiap suara di sekolah. Membangun komunitas, mendorong perubahan.
          </p>
          <div className="footer__social">
            {[ 'ig'].map(s => (
              <a key={s} href="https://www.instagram.com/smenzakeren/" className="footer__social-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700 }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="footer__col-title">Tautan Cepat</div>
          <ul className="footer__links">
            {['Home', 'Calendar', 'News', 'About', 'Login'].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>

       

        <div>
          <div className="footer__col-title">Kontak</div>
          <ul className="footer__links">
            <li><a href="mailto:osissmkn1kebumen@gmail.com">osissmkn1kebumen@gmail.com</a></li>
            <li><a href="https://www.google.com/maps/place/SMK+Negeri+1+Kebumen/@-7.6537967,109.661042,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7ab5e2a04f051f:0xa5f5fbab3f3ee77b!8m2!3d-7.653802!4d109.6636169!16s%2Fg%2F1tk5qs7m?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D">Jl. Cemara No.37, Karangsari, Kec. Kebumen, Kabupaten Kebumen, Jawa Tengah</a></li>
            <li style={{ marginTop: '0.75rem' }}>
              <a href="#" style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'var(--accent)',
                color: '#0a0a0f',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none'
              }}>
                Bantuan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} <span>OSIS SMK Negeri 1 Kebumen</span>. All rights reserved
        </p>
        
      </div>
    </footer>
  );
}
