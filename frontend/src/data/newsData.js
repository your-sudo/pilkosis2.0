export const NEWS = [
  {
    id: 1,
    title: 'Student Council Secures $50K Grant for Campus Sustainability Initiative',
    excerpt: 'After months of advocacy, the student council has successfully secured a major sustainability grant that will fund solar panels, electric vehicle charging stations, and a campus-wide recycling overhaul.',
    category: 'announcement',
    author: { name: 'Maya Chen', initials: 'MC', color: '#c8f04a' },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    isNew: true,
    featured: true,
    imageColor: 'from-green to-teal',
  },
  {
    id: 2,
    title: 'Spring Talent Show Tickets Now Available — Limited Seats!',
    excerpt: 'The most anticipated event of the semester is almost here. Grab your tickets before they sell out.',
    category: 'event',
    author: { name: 'Jordan Lee', initials: 'JL', color: '#4a8ff0' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isNew: true,
    featured: false,
  },
  {
    id: 3,
    title: 'Council Debate Team Wins Regional Championship',
    excerpt: 'Our schools debate team brought home the regional trophy, defeating 14 competing schools across the district.',
    category: 'achievement',
    author: { name: 'Sam Rivera', initials: 'SR', color: '#ffa032' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isNew: false,
    featured: false,
  },
  {
    id: 4,
    title: 'New Mental Health Resources Available on Student Portal',
    excerpt: 'In response to student feedback, the council has partnered with local clinics to provide free counseling sessions accessible through the student portal.',
    category: 'announcement',
    author: { name: 'Taylor Kim', initials: 'TK', color: '#f04a8f' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    isNew: false,
    featured: false,
  },
  {
    id: 5,
    title: 'Earth Day Campus Cleanup: Sign Up Now',
    excerpt: 'Join hundreds of volunteers on March 22nd for our annual Earth Day cleanup across the entire campus and surrounding neighborhood.',
    category: 'event',
    author: { name: 'Maya Chen', initials: 'MC', color: '#c8f04a' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14),
    isNew: false,
    featured: false,
  },
  {
    id: 6,
    title: 'Cafeteria Menu Survey Results Are In',
    excerpt: 'Students have spoken — more plant-based options, extended hours, and a dedicated late-night food truck are all coming this fall.',
    category: 'general',
    author: { name: 'Jordan Lee', initials: 'JL', color: '#4a8ff0' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
    isNew: false,
    featured: false,
  },
];

const CATEGORIES = ['Semua', 'Pemberitahuan', 'Berita Acara', 'Pencapaian'];

export { CATEGORIES };

export function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  return `${day}d ago`;
}
