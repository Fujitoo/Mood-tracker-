
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mood, JournalEntry } from './types';
import { MOODS, MONTH_NAMES } from './constants';
import { getSupportiveInsight } from './services/geminiService';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import JournalInput from './components/JournalInput';
import MoodHistory from './components/MoodHistory';
import ConfirmationModal from './components/ConfirmationModal';
import SuccessToast from './components/SuccessToast';
import HistoryFilter from './components/HistoryFilter';
import FloatingEmojis from './components/FloatingEmojis';

const App = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(
        MOODS.find(mood => mood.label === 'Okay') || null
    );
    const [journalText, setJournalText] = useState<string>('');
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [entryToDeleteId, setEntryToDeleteId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [filterYear, setFilterYear] = useState<string>('all');
    const [filterMonth, setFilterMonth] = useState<string>('all');

    useEffect(() => {
        try {
            const storedEntries = localStorage.getItem('moodJournalEntries');
            if (storedEntries) {
                setEntries(JSON.parse(storedEntries));
            }
        } catch (err: any) {
            console.error("Failed to load entries from local storage:", err);
            setError("Could not load your past entries. Local storage might be disabled or corrupted.");
        }
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000); // Message visible for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleSaveEntry = useCallback(async () => {
        if (!selectedMood || !journalText.trim()) {
            setError('Please select a mood and write a journal entry.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const insight = await getSupportiveInsight(journalText);
            
            const newEntry: JournalEntry = {
                id: Date.now(),
                mood: selectedMood,
                text: journalText,
                date: new Date().toISOString(),
                aiInsight: insight,
            };

            const updatedEntries = [newEntry, ...entries];
            setEntries(updatedEntries);
            localStorage.setItem('moodJournalEntries', JSON.stringify(updatedEntries));

            // Reset form to default state and provide user feedback
            setSelectedMood(MOODS.find(mood => mood.label === 'Okay') || null);
            setJournalText('');
            setSuccessMessage('Entry saved successfully!');

        } catch (err: any) {
            console.error("Failed to save entry:", err);
            setError('Could not get an AI insight. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedMood, journalText, entries]);

    const requestDeleteConfirmation = (idToDelete: number) => {
        setEntryToDeleteId(idToDelete);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = useCallback(() => {
        if (entryToDeleteId === null) return;

        const updatedEntries = entries.filter(entry => entry.id !== entryToDeleteId);
        setEntries(updatedEntries);
        localStorage.setItem('moodJournalEntries', JSON.stringify(updatedEntries));

        setIsDeleteModalOpen(false);
        setEntryToDeleteId(null);
    }, [entries, entryToDeleteId]);

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setEntryToDeleteId(null);
    };
    
    const availableYears = useMemo(() => {
        const years = new Set(entries.map(entry => new Date(entry.date).getFullYear()));
        return Array.from(years).sort((a, b) => b - a);
    }, [entries]);

    const filteredEntries = useMemo(() => {
        return entries.filter(entry => {
            const entryDate = new Date(entry.date);
            const yearMatch = filterYear === 'all' || entryDate.getFullYear() === parseInt(filterYear, 10);
            const monthMatch = filterMonth === 'all' || entryDate.getMonth() === parseInt(filterMonth, 10);
            return yearMatch && monthMatch;
        });
    }, [entries, filterYear, filterMonth]);


    return (
        <div className="relative min-h-screen bg-sky-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <FloatingEmojis />
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                {successMessage && <SuccessToast message={successMessage} />}
                <div className="max-w-3xl mx-auto">
                    <Header />
                    
                    <main className="mt-8 space-y-12">
                        <section className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                            <h2 className="text-2xl font-bold text-center text-slate-700 dark:text-slate-300 mb-6">How are you feeling today?</h2>
                            <MoodSelector
                                moods={MOODS}
                                selectedMood={selectedMood}
                                onSelectMood={setSelectedMood}
                            />
                        </section>

                        <section className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                            <JournalInput
                                journalText={journalText}
                                onTextChange={setJournalText}
                                onSave={handleSaveEntry}
                                isLoading={isLoading}
                                isMoodSelected={!!selectedMood}
                            />
                            {error && <p className="text-rose-500 text-sm mt-4 text-center">{error}</p>}
                        </section>

                        <section>
                        <h2 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-300 mb-8">
                                Your Mood History
                            </h2>
                            {entries.length > 0 && (
                                <HistoryFilter
                                    availableYears={availableYears}
                                    selectedYear={filterYear}
                                    onYearChange={setFilterYear}
                                    selectedMonth={filterMonth}
                                    onMonthChange={setFilterMonth}
                                    monthNames={MONTH_NAMES}
                                />
                            )}
                        <MoodHistory 
                            entries={filteredEntries} 
                            totalEntriesCount={entries.length}
                            onDeleteEntry={requestDeleteConfirmation} 
                            />
                        </section>
                    </main>

                    <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Mood Journal Tracker. All rights reserved.</p>
                    </footer>
                </div>
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this entry? This action cannot be undone."
                />
            </div>
        </div>
    );
};

export default App;