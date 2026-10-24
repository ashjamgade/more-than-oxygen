// Dates use India time so every visitor sees the same elapsed duration.
export const STORY = {
  acceptedDate: '2025-07-05',
  counterStart: '2025-07-25T00:00:00+05:30',
  joiningDate: '2026-10-19',
  indiaZone: 'Asia/Kolkata',
  sydneyZone: 'Australia/Sydney',
};
export function elapsedSince(start, now = Date.now()) {
  const seconds = Math.max(0, Math.floor((now - new Date(start).getTime()) / 1000));
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
}
export const MEMORIES = [
  { photo: '/photos/dolly-1.jpg', title: 'Where it began', caption: '5 July 2025. A small notification, and a new person to look forward to.' },
  { photo: '/photos/dolly-2.jpg', title: 'Your curiosity', caption: 'The way you ask questions and keep learning is something I admire about you.' },
  { photo: '/photos/dolly-3.jpg', title: 'A familiar smile', caption: 'Some pictures make an ordinary day feel a little lighter. This is one of them.' },
  { photo: '/photos/dolly-4.jpg', title: 'Your own kind of beautiful', caption: 'Your warmth, your humour, and all the little things that are simply you.' },
  { photo: '/photos/dolly-5.jpg', title: 'New horizons', caption: 'A new chapter at IIT Bombay. I am so proud to see you follow your curiosity.' },
  { photo: '/photos/dolly-6.jpg', title: 'Across the distance', caption: 'Sydney and Mumbai. Different skies, with so much still to discover.' },
];
