export const EVENTS = [
  {
    id: 1,
    title: 'General Assembly Meeting',
    date: new Date(2026, 2, 13),
    time: '3:00 PM – 5:00 PM',
    location: 'Main Auditorium',
    type: 'meeting',
    description: 'Monthly general assembly for all student council members.',
  },
  {
    id: 2,
    title: 'Spring Talent Show',
    date: new Date(2026, 2, 15),
    time: '6:00 PM – 9:00 PM',
    location: 'Campus Theater',
    type: 'social',
  },
  {
    id: 3,
    title: 'Budget Review Committee',
    date: new Date(2026, 2, 17),
    time: '2:00 PM – 3:30 PM',
    location: 'Room 204',
    type: 'meeting',
  },
  {
    id: 4,
    title: 'Midterm Study Sprint',
    date: new Date(2026, 2, 18),
    time: '10:00 AM – 4:00 PM',
    location: 'Library Hall',
    type: 'academic',
  },
  {
    id: 5,
    title: 'Inter-School Basketball',
    date: new Date(2026, 2, 20),
    time: '1:00 PM – 6:00 PM',
    location: 'Sports Complex',
    type: 'sports',
  },
  {
    id: 6,
    title: 'Earth Day Campaign Kickoff',
    date: new Date(2026, 2, 22),
    time: '9:00 AM – 11:00 AM',
    location: 'Campus Quad',
    type: 'social',
  },
  {
    id: 7,
    title: 'Presidents Town Hall',
    date: new Date(2026, 2, 25),
    time: '4:00 PM – 5:30 PM',
    location: 'Lecture Hall A',
    type: 'meeting',
  },
  {
    id: 8,
    title: 'Cultural Night Gala',
    date: new Date(2026, 2, 28),
    time: '7:00 PM – 11:00 PM',
    location: 'University Hall',
    type: 'social',
  },
  {
    id: 9,
    title: 'Scholarship Applications Due',
    date: new Date(2026, 2, 31),
    time: '11:59 PM',
    location: 'Online Portal',
    type: 'academic',
  },
];

export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export const MONTH_NAMES = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];

export const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export const TYPE_LABELS = {
  meeting: 'Meeting',
  social: 'Social',
  academic: 'Academic',
  sports: 'Sports',
};
