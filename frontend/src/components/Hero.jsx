import '../styles/Hero.css';

const stats = [
  { value: '1,500', suffix: '+', label: 'Total Siswa' },
  { value: '10+', suffix: '', label: 'Acara' },
  { value: '10', suffix: '', label: 'Seksi Bidang' },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__bg-blob hero__bg-blob--1"></div>
        <div className="hero__bg-blob hero__bg-blob--2"></div>
        <div className="hero__bg-blob hero__bg-blob--3"></div>
      </div>

      <div className="hero__badge">
        <span className="hero__badge-dot"></span>
        Periode 2026-2027
      </div>

      <h1 className="hero__title">
        Smenza Student Council <br />
        <em className="hero__title-em">@smenzakeren</em>
      </h1>

      <p className="hero__sub">
        Mewakili setiap siswa. Mendorong perubahan, membangun komunitas, dan menjadikan pengalaman sekolahmu tak terlupakan.
      </p>

      <div className="hero__actions">
        <a className="hero__btn hero__btn--primary" href="#calendar">Lihat Kalender</a>
        <a className="hero__btn hero__btn--secondary" href="#news">Berita Terbaru →</a>
      </div>

      <div className="hero__stats">
        {stats.map(s => (
          <div key={s.label}>
            <div className="hero__stat-value">
              {s.value}<span>{s.suffix}</span>
            </div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
