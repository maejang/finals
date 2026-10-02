import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#E9E4D4] text-[#4A3E3D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#D8D2BE] transition-colors"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
            currentPage === pageNum
              ? 'bg-[#D4A373] text-white shadow-sm scale-105'
              : 'bg-[#FFFDF6] text-[#4A3E3D] border border-[#E9E4D4] hover:bg-[#F4EFEA]'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#E9E4D4] text-[#4A3E3D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#D8D2BE] transition-colors"
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};