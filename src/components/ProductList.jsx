import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

export default function ProductList({
  products,
  favorites = [],
  onToggleFavorite,
  onViewDetails,
  onAddToCart,
  onPreviewImage
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Exactly 6 items per page

  // Filter products by category and grade
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesGrade = selectedGrade === 'All' || p.grade === selectedGrade;
      return matchesCategory && matchesGrade;
    });
  }, [products, selectedCategory, selectedGrade]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedGrade]);

  // Calculate total pages and slice current page items
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6">
      {/* Dark Filter Bar */}
      <div className="bg-[#171122] p-4 rounded-xl border border-[#2B233C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <span className="text-rose-500 font-black tracking-wider flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            FILTERS:
          </span>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#231A34] text-zinc-200 border border-[#3A2F52] rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-500 cursor-pointer font-medium"
          >
            <option value="All">All Categories</option>
            <option value="Scale Figure">Scale Figure</option>
            <option value="Action Figure">Action Figure</option>
          </select>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-[#231A34] text-zinc-200 border border-[#3A2F52] rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-500 cursor-pointer font-medium"
          >
            <option value="All">All Sorcerer Grades</option>
            <option value="Special Grade">Special Grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Semi-Grade 1">Semi-Grade 1</option>
            <option value="Non-Standard">Non-Standard</option>
          </select>
        </div>

        <div className="text-zinc-400 text-[11px] font-semibold">
          Showing {paginatedProducts.length} of {filteredProducts.length} Figures
        </div>
      </div>

      {/* Grid Display (Displaying Paginated 6 Products) */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedProducts.map((product) => {
            const isFav = Array.isArray(favorites) && favorites.includes(product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFav}
                onToggleFavorite={onToggleFavorite}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
                onPreviewImage={onPreviewImage}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#171122] rounded-2xl border border-dashed border-[#2B233C]">
          <p className="text-xs font-semibold text-zinc-400">
            No Sorcerer Collectibles matched your criteria.
          </p>
        </div>
      )}

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  onToggleFavorite: PropTypes.func,
  onViewDetails: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPreviewImage: PropTypes.func.isRequired,
};