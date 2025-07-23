import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
    moods: Mood[];
    selectedMood: Mood | null;
    onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onSelectMood }) => {
    return (
        <div className="flex justify-center items-start flex-wrap gap-x-4 gap-y-8 sm:gap-x-6">
            {moods.map((mood) => (
                <div key={mood.label} className="group flex flex-col items-center gap-2 text-center w-20 sm:w-24">
                    <button
                        data-mood={mood.label.toLowerCase()}
                        onClick={() => onSelectMood(mood)}
                        className={`
                            mood-emoji flex-shrink-0 flex items-center justify-center
                            w-20 h-20 sm:w-24 sm:h-24 rounded-full
                            transition-all duration-300 ease-in-out
                            transform hover:scale-110 focus:outline-none focus:ring-4
                            border border-slate-200 dark:border-slate-600
                            ${selectedMood?.label === mood.label
                                ? `${mood.color} text-white shadow-lg ring-4 ring-offset-2 dark:ring-offset-slate-800 ring-opacity-75`
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }
                            ${selectedMood?.label === mood.label ? 'ring-sky-400' : 'focus:ring-sky-300'}
                        `}
                    >
                        <span className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                            {mood.emoji}
                        </span>
                    </button>
                    <span
                        className={`
                            text-xs font-semibold
                            transition-opacity duration-300
                            ${selectedMood?.label === mood.label ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                            text-slate-600 dark:text-slate-400
                        `}
                    >
                        {mood.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default MoodSelector;
