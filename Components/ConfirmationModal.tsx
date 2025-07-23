import React, { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 m-4 max-w-sm w-full transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200" id="modal-title">
            {title}
          </h3>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            {message}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            type="button"
            className="flex items-center justify-center w-full rounded-lg px-4 py-3 text-lg font-bold
                       bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200
                       hover:bg-slate-300 dark:hover:bg-slate-500
                       focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-700
                       transition-all duration-200"
          >
            <span role="img" aria-label="No" className="mr-2 text-2xl">❌</span>
            No
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="flex items-center justify-center w-full rounded-lg px-4 py-3 text-lg font-bold
                       bg-rose-500 text-white
                       hover:bg-rose-600
                       focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800
                       transition-all duration-200"
          >
            <span role="img" aria-label="Yes" className="mr-2 text-2xl">✅</span>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
