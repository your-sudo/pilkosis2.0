import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Calendar from '../components/Calendar';
import News from '../components/News';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div style={{ width: '100%', height: 1, background: 'var(--border)', maxWidth: 1200, margin: '0 auto' }} />
        <Calendar />
        <div style={{ width: '100%', height: 1, background: 'var(--border)', maxWidth: 1200, margin: '0 auto' }} />
        <News />
      </main>
      <Footer />
    </>
  );
}
