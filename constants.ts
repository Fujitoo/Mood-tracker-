import { Mood } from './types';

export const MOODS: Mood[] = [
    { label: 'Happy', emoji: '😀', color: 'bg-amber-400' },
    { label: 'Good', emoji: '🙂', color: 'bg-teal-400' },
    { label: 'Okay', emoji: '😐', color: 'bg-sky-400' },
    { label: 'Sad', emoji: '😟', color: 'bg-indigo-400' },
    { label: 'Angry', emoji: '😠', color: 'bg-rose-500' },
    { label: 'Anxious', emoji: '😰', color: 'bg-violet-500' },
];

export const MONTH_NAMES: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];
