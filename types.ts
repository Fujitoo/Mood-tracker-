
export interface Mood {
    label: string;
    emoji: string;
    color: string;
}

export interface JournalEntry {
    id: number;
    mood: Mood;
    text: string;
    date: string;
    aiInsight: string | null;
}
