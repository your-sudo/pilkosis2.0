import { useState, useEffect } from 'react';
import '../styles/Calendar.css';
import {
  getMonthDays, sameDay, MONTH_NAMES, DAY_NAMES, TYPE_LABELS
} from '../data/calendarData';

function EventCard({ event, delay = 0 }) {
  const today = new Date();
  
  // Check if today falls anywhere inside the event's start to end period
  const isToday = (() => {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const s = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()).getTime();
    const e = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate()).getTime();
    return t >= s && t <= e;
  })();

  const day = event.date.getDate();
  const month = MONTH_NAMES[event.date.getMonth()].slice(0, 3).toUpperCase();

  return (
    <div
      className={`event-card ${isToday ? 'event-card--today' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="event-date-badge">
        <span className="event-date-badge__day">{day}</span>
        <span className="event-date-badge__month">{month}</span>
      </div>
      <div className="event-info">
        <div className="event-info__title">{event.title}</div>
        <div className="event-info__meta">
          <span className="event-info__time">{event.time}</span>
          <span className="event-info__location"> {event.location}</span>
          <span className={`event-tag event-tag--${event.type}`}>
            {TYPE_LABELS[event.type]}
          </span>
          {isToday && <span style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700 }}>HARI INI</span>}
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(now);
  const [tick, setTick] = useState(0);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(e => {
          const sDate = new Date(e.start);
          const eDate = e.end ? new Date(e.end) : sDate;
          
          let timeString = '';
          if (sDate.toDateString() === eDate.toDateString()) {
            timeString = `${sDate.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})} - ${eDate.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}`;
          } else {
            timeString = `${sDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} ${sDate.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})} s.d. ${eDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} ${eDate.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}`;
          }

          return {
            id: e._id,
            title: e.judul,
            date: sDate,
            endDate: eDate,
            time: timeString,
            location: e.location || '-',
            type: e.type || 'Keagamaan'
          };
        });
        setEventsData(formatted);
      })
      .catch(console.error);
  }, []);

  // Simulate "real-time": re-evaluate today's marker each minute
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const cells = getMonthDays(currentYear, currentMonth);
  const today = new Date();

  // Helper function to check if a specific day falls within an event's start to end date
  const isDateInEvent = (check, start, end) => {
    const c = new Date(check.getFullYear(), check.getMonth(), check.getDate()).getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return c >= s && c <= e;
  };

  const eventDays = new Set();
  eventsData.forEach(ev => {
    cells.forEach(day => {
      if (!day) return;
      const cellDate = new Date(currentYear, currentMonth, day);
      if (isDateInEvent(cellDate, ev.date, ev.endDate)) {
        eventDays.add(day);
      }
    });
  });

  const selectedEvents = eventsData.filter(ev => isDateInEvent(selectedDate, ev.date, ev.endDate));

  // Show events that are active exactly on the selected date
  const displayEvents = selectedEvents
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  return (
    <section className="calendar-section" id="calendar">
      <div className="section-header">
        <div>
          <div className="section-tag section-tag--green">Kalender Siswa</div>
          <h2 className="section-title">Aktivitas &amp; Acara</h2>
          <p className="section-desc">Klik tanggal untuk melihat event</p>
        </div>
      </div>

      <div className="calendar-grid">
        {/* Mini Calendar */}
        <div className="mini-cal">
          <div className="mini-cal__header">
            <span className="mini-cal__month">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <div className="mini-cal__nav">
              <button onClick={prevMonth}>‹</button>
              <button onClick={nextMonth}>›</button>
            </div>
          </div>

          <div className="mini-cal__days-header">
            {DAY_NAMES.map(d => (
              <div key={d} className="mini-cal__day-name">{d}</div>
            ))}
          </div>

          <div className="mini-cal__grid">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="mini-cal__cell mini-cal__cell--empty" />;

              const cellDate = new Date(currentYear, currentMonth, day);
              const isToday = sameDay(cellDate, today);
              const isSelected = sameDay(cellDate, selectedDate);
              const hasEvent = eventDays.has(day);

              return (
                <div
                  key={day}
                  className={[
                    'mini-cal__cell',
                    isToday ? 'mini-cal__cell--today' : '',
                    isSelected ? 'mini-cal__cell--selected' : '',
                    hasEvent ? 'mini-cal__cell--has-event' : '',
                  ].join(' ')}
                  onClick={() => setSelectedDate(cellDate)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {Object.entries(TYPE_LABELS).map(([key, label]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor:
                    key === 'Keagamaan' ? 'var(--blue)' :
                    key === 'Olahraga' ? 'var(--pink)' :
                    key === 'Seni' ? 'var(--accent)' : '#ffa032'
                  }}></div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event List */}
        <div>
          <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700 }}>
              {sameDay(selectedDate, today)
                ? 'Hari Ini'
                : `Dari ${MONTH_NAMES[selectedDate.getMonth()].slice(0,3)} ${selectedDate.getDate()}`}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {displayEvents.length} acara
            </span>
          </div>

          <div className="event-list">
            {displayEvents.length > 0
              ? displayEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} delay={i * 60} />
                ))
              : <div className="event-list__empty">Kegiatan kosong</div>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
