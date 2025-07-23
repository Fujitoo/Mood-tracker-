import React from 'react';
import { CheckCircleIcon } from './Icons';

interface SuccessToastProps {
  message: string;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message }) => {
  return (
    <div
      role="alert"
      className="fixed top-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg bg-emerald-500 dark:bg-emerald-600 text-white transition-opacity duration-300"
    >
      <CheckCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default SuccessToast;
