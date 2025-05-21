import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const toKhmerNumber = (num: number): string => {
  const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num
    .toString()
    .split('')
    .map(digit => khmerNumbers[parseInt(digit)])
    .join('');
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center gap-2 mt-4 px-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 disabled:opacity-50 cursor-pointer text-sm"
      >
        ត្រលប់
      </button>

      {pageNumbers.map((number, index) =>
        number === '...' ? (
          <span key={index} className="px-2 text-sm text-gray-500">...</span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number as number)}
            className={`px-3 py-1 border border-gray-200 text-sm cursor-pointer ${
              currentPage === number ? 'bg-blue-500 text-white font-bold border-0' : ''
            }`}
          >
            {toKhmerNumber(number as number)}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 disabled:opacity-50 cursor-pointer text-sm"
      >
        បន្ទាប់
      </button>
    </div>
  );
};

export default Pagination;
