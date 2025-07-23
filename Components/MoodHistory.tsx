import React from 'react';
import { JournalEntry } from '../types';
import { SparklesIcon, TrashIcon } from './Icons';

interface MoodHistoryProps {
    entries: JournalEntry[];
    totalEntriesCount: number;
    onDeleteEntry: (id: number) => void;
}

const MoodHistoryCard: React.FC<{ entry: JournalEntry; onDelete: () => void }> = ({ entry, onDelete }) => {
    return (
        <article className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${entry.mood.color} flex items-center justify-center text-4xl`}>
                    {entry.mood.emoji}
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{entry.mood.label}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <time className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {new Date(entry.date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </time>
                            <button 
                                onClick={onDelete}
                                aria-label="Delete entry"
                                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors duration-200"
                            >
                                <TrashIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{entry.text}</p>
                </div>
            </div>
            {entry.aiInsight && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <SparklesIcon className="text-sky-500 w-5 h-5 flex-shrink-0 mt-1" />
                    <p className="text-sm italic text-sky-800 dark:text-sky-300">
                        {entry.aiInsight}
                    </p>
                </div>
            )}
        </article>
    );
};

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries, totalEntriesCount, onDeleteEntry }) => {
    const renderEmptyState = () => {
        if (totalEntriesCount === 0) {
            return (
                <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md">
                    <p className="text-slate-500 dark:text-slate-400">No entries yet. Select a mood and write your first journal entry to begin!</p>
                </div>
            );
        }
        if (entries.length === 0 && totalEntriesCount > 0) {
            return (
                 <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md">
                    <p className="text-slate-500 dark:text-slate-400">No entries match the current filter. Try selecting a different month or year!</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {entries.length === 0 ? (
                renderEmptyState()
            ) : (
                <div id="history-list" className="space-y-6">
                    {entries.map((entry) => (
                        <MoodHistoryCard 
                            key={entry.id} 
                            entry={entry} 
                            onDelete={() => onDeleteEntry(entry.id)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoodHistory;
