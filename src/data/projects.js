import { BookOpen, LockKeyhole, MapPinned, Plane } from 'lucide-react';

export const projects = [
  {
    title: 'Safe Ballot',
    shortLabel: 'Secure voting',
    category: 'Security · Web app',
    description: 'A voting platform focused on transparent participation and security-conscious design, bringing cryptography and a clear user experience together.',
    tech: ['React', 'Cryptography', 'Backend'],
    icon: LockKeyhole,
    theme: 'teal',
    link: 'https://github.com/webdoc-rokib/safe_ballot',
  },
  {
    title: 'Rescue Map BD',
    shortLabel: 'Response mapping',
    category: 'Civic tech · Mapping',
    description: 'A disaster-response coordination concept for surfacing rescue requests and critical local resources on a shared map.',
    tech: ['Mapping', 'Real-time', 'WebSocket'],
    icon: MapPinned,
    theme: 'coral',
    link: 'https://github.com/webdoc-rokib/rescue-map-bd',
  },
  {
    title: 'ClassWave',
    shortLabel: 'Learning platform',
    category: 'Education · Web app',
    description: 'An academic management tool designed to make classroom activities, assignments, and student communication easier to manage.',
    tech: ['React', 'Database', 'UI/UX'],
    icon: BookOpen,
    theme: 'blue',
    link: 'https://github.com/Northern-University-Bangladesh/ClassWave',
  },
  {
    title: 'Visa Track',
    shortLabel: 'Application tracking',
    category: 'Automation · Web app',
    description: 'A visa application tracking concept for organizing application status, notifications, and supporting documents.',
    tech: ['Automation', 'Notifications', 'Database'],
    icon: Plane,
    theme: 'violet',
    link: 'https://github.com/webdoc-rokib/visa-track',
  },
];
