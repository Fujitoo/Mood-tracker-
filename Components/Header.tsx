import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                Mood Journal Tracker
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
                Your personal space to reflect and grow.
            </p>
        </header>
    );
};

export default Header;