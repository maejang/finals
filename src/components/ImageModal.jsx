import React from 'react';
import PropTypes from 'prop-types';

export default function ImageModal({ image, alt, onClose }) {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] bg-[#1A1A1A] p-2 rounded-2xl border border-neutral-700 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>

        <img
          src={image}
          alt={alt}
          className="max-h-[85vh] w-auto max-w-full object-contain mx-auto rounded-lg"
        />
      </div>
    </div>
  );
}

ImageModal.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};