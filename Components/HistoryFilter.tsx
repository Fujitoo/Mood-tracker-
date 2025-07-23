import React from 'react';
import { FilterIcon } from './Icons';

interface HistoryFilterProps {
  availableYears: number[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  monthNames: string[];
}

const HistoryFilter: React.FC<HistoryFilterProps> = ({
  availableYears,
  selectedYear,
  onYearChange,
  selectedMonth,
  onMonthChange,
  monthNames,
}) => {
  return (
    <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center text-slate-600 dark:text-slate-300 font-semibold">
        <FilterIcon className="w-5 h-5 mr-2" />
        <span>Filter by:</span>
      </div>
      <div className="flex-grow flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <select
          id="year-select"
          aria-label="Filter by year"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-full sm:w-auto flex-grow bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
        >
          <option value="all">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          id="month-select"
          aria-label="Filter by month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          disabled={selectedYear === 'all'}
          className="w-full sm:w-auto flex-grow bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="all">All Months</option>
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HistoryFilter;
