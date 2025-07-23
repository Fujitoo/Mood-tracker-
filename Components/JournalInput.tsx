import React from 'react';
import { SparklesIcon, SaveIcon, LoadingSpinner } from './Icons';

interface JournalInputProps {
    journalText: string;
    onTextChange: (text: string) => void;
    onSave: () => void;
    isLoading: boolean;
    isMoodSelected: boolean;
}

const JournalInput: React.FC<JournalInputProps> = ({ journalText, onTextChange, onSave, isLoading, isMoodSelected }) => {
    const canSave = journalText.trim().length > 0 && !isLoading && isMoodSelected;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center text-slate-700 dark:text-slate-300 mb-4">
                What's on your mind?
            </h2>
            <div className="w-full">
                <textarea
                    id="journal-entry-text"
                    value={journalText}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder={isMoodSelected ? "Tell me more..." : "Please select a mood first"}
                    rows={6}
                    disabled={!isMoodSelected}
                    className="w-full p-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg shadow-inner resize-y
                               bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-sky-400 focus:border-transparent
                               transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>
            <button
                id="save-entry-btn"
                onClick={onSave}
                disabled={!canSave}
                className="mt-6 flex items-center justify-center px-8 py-3 w-full sm:w-auto
                           font-semibold text-white rounded-lg shadow-md
                           bg-gradient-to-r from-sky-500 to-cyan-500
                           hover:from-sky-600 hover:to-cyan-600
                           focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800
                           transition-all duration-300 ease-in-out
                           transform hover:scale-105
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-gradient-none disabled:bg-slate-400"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
                        Analyzing...
                    </>
                ) : (
                    <>
                        <SaveIcon />
                        Save Entry & Get Insight
                        <SparklesIcon />
                    </>
                )}
            </button>
        </div>
    );
};

export default JournalInput;