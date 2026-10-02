import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#171122] text-zinc-300 border border-[#2B233C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#231A34] hover:text-white transition-colors"
      >
        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
            currentPage === pageNum
              ? 'bg-[#DC2626] text-white shadow-lg shadow-rose-900/40 scale-105'
              : 'bg-[#171122] text-zinc-400 border border-[#2B233C] hover:bg-[#231A34] hover:text-zinc-200'
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#171122] text-zinc-300 border border-[#2B233C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#231A34] hover:text-white transition-colors"
      >
        Next
        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};