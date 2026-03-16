import { useState, useEffect } from 'react';
import '../styles/News.css';
import { CATEGORIES, formatRelativeTime } from '../data/newsData';

// SVG pattern images for featured cards
function NewsImage({ category }) {
  const configs = {
    'Pemberitahuan': { bg: '#1a2a1a', color: '#c8f04a', icon: '📢' },
    'Berita Acara': { bg: '#1a1a2a', color: '#4a8ff0', icon: '🎉' },
    'Pencapaian': { bg: '#2a2010', color: '#ffa032', icon: '🏆' },
    general: { bg: '#2a1020', color: '#f04a8f', icon: '📰' },
  };
  const c = configs[category] || configs.general;

  return (
    <div className="news-card__image" style={{ background: c.bg }}>
      <svg className="news-card__image-pattern" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`grid-${category}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={c.color} strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="400" height="200" fill={`url(#grid-${category})`}/>
        <circle cx="200" cy="100" r="60" fill={c.color} opacity="0.07"/>
        <circle cx="200" cy="100" r="30" fill={c.color} opacity="0.1"/>
      </svg>
      <span style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1 }}>{c.icon}</span>
    </div>
  );
}

function NewsCard({ article, featured, compact, delay = 0 }) {
  const [relTime, setRelTime] = useState(formatRelativeTime(article.timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setRelTime(formatRelativeTime(article.timestamp));
    }, 30000);
    return () => clearInterval(interval);
  }, [article.timestamp]);

  if (compact) {
    return (
      <div className="news-card news-card--compact" style={{ animationDelay: `${delay}ms` }}>
        <span className="news-card__compact-num">0{delay / 80 + 1}</span>
        <div className="news-card__body">
          <span className={`news-card__category news-card__category--${article.category}`}>
            {article.category}
          </span>
          <div className="news-card__title">{article.title}</div>
          <div className="news-card__footer" style={{ marginTop: 8 }}>
            <span className="news-card__time">{relTime}</span>
            {article.isNew && <span className="news-card__new-badge">Baru</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`news-card ${featured ? 'news-card--featured' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {featured && <NewsImage category={article.category} />}
      <div className="news-card__body">
        <span className={`news-card__category news-card__category--${article.category}`}>
          {article.category}
        </span>
        <div className="news-card__title">{article.title}</div>
        {(featured || !compact) && (
          <p className="news-card__excerpt">{article.excerpt}</p>
        )}
        <div className="news-card__footer">
          <div className="news-card__author">
            <div
              className="news-card__avatar"
              style={{ background: article.author.color }}
            >
              {article.author.initials}
            </div>
            <span className="news-card__author-name">{article.author.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="news-card__time">{relTime}</span>
            {article.isNew && <span className="news-card__new-badge">Baru</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const [filter, setFilter] = useState('Semua');
  const [articles, setArticles] = useState([]);

  // Fetch news and occasionally bump timestamps / add new
  useEffect(() => {
    fetch('http://localhost:3000/api/news')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(n => ({
          id: n._id,
          title: n.judul,
          excerpt: n.deskripsi,
          category: n.kategori || 'Pemberitahuan',
          author: { name: n.authorName || 'Admin', initials: (n.authorName || 'A')[0], color: 'var(--blue)' },
          isNew: n.isNewItem,
          timestamp: new Date(n.tanggal)
        }));
        setArticles(formatted);
      })
      .catch(console.error);

    const interval = setInterval(() => {
      // Just force re-render to update relative times
      setArticles(prev => [...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === 'Semua'
    ? articles
    : articles.filter(a => a.category === filter);

  const [featured, ...rest] = filtered;
  const stack = rest.slice(0, 2);
  const row = rest.slice(2, 5);

  return (
    <section className="news-section" id="news">
      <div className="section-header">
        
        <h2 className="section-title">Berita Acara</h2>

        <div className="news-controls">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`news-filter-btn ${filter === cat ? 'news-filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          <div className="news-live-indicator">
            <span className="news-live-dot"></span>
            Berita & Artikel Siswa
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Belum ada artikel di kategori ini.
        </div>
      ) : (
        <>
          <div className="news-featured">
            {featured && <NewsCard article={featured} featured delay={0} />}
            {stack.length > 0 && (
              <div className="news-stack">
                {stack.map((a, i) => (
                  <NewsCard key={a.id} article={a} compact delay={i * 80} />
                ))}
              </div>
            )}
          </div>

          {row.length > 0 && (
            <div className="news-row">
              {row.map((a, i) => (
                <NewsCard key={a.id} article={a} delay={i * 80} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
