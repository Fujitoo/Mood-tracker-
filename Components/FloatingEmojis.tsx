import React from 'react';
import { MOODS } from '../constants';

const FloatingEmojis: React.FC = () => {
    // Create a larger array of emojis for more density in the background
    const emojis = MOODS.flatMap(mood => Array(4).fill(mood.emoji));

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {emojis.map((emoji, index) => {
                const style: React.CSSProperties = {
                    left: `${Math.random() * 100}vw`,
                    fontSize: `${Math.random() * 2 + 1}rem`, // Random size between 1rem and 3rem
                    opacity: Math.random() * 0.4 + 0.1,    // Random opacity between 0.1 and 0.5
                    animationName: 'float, glow',
                    animationDuration: `${Math.random() * 20 + 15}s, ${Math.random() * 5 + 3}s`,
                    animationDelay: `${Math.random() * 15}s, ${Math.random() * 5}s`,
                    animationTimingFunction: 'linear, ease-in-out',
                    animationIterationCount: 'infinite, infinite',
                    animationDirection: 'normal, alternate',
                };
                return (
                    <span
                        key={index}
                        className="absolute bottom-[-10%]"
                        style={style}
                        aria-hidden="true"
                    >
                        {emoji}
                    </span>
                );
            })}
        </div>
    );
};

export default FloatingEmojis;
