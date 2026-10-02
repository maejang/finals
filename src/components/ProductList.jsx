import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

export default function ProductList({ products, onViewDetails, onAddToCart, onPreviewImage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.character.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesGrade = selectedGrade === 'All' || p.grade === selectedGrade;

      return matchesSearch && matchesCategory && matchesGrade;
    });
  }, [products, searchTerm, selectedCategory, selectedGrade]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedGrade]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="space-y-6">
      <div className="bg-[#FFFDF6] p-4 rounded-2xl border border-[#E9E4D4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search characters, figures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-[#F4EFEA] border border-[#E0D8C3] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-[#4A3E3D]"
          />
          <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-[#D4A373]/20 border border-[#D4A373]/40 rounded-full px-3 py-1 text-xs">
            <span className="text-[#5C4F47] mr-1 font-medium">Type:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-[#4A3E3D] font-bold focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Scale Figure">Scale Figure</option>
              <option value="Action Figure">Action Figure</option>
            </select>
          </div>

          <div className="flex items-center bg-[#D4A373]/20 border border-[#D4A373]/40 rounded-full px-3 py-1 text-xs">
            <span className="text-[#5C4F47] mr-1 font-medium">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent text-[#4A3E3D] font-bold focus:outline-none cursor-pointer"
            >
              <option value="All">All Grades</option>
              <option value="Special Grade">Special Grade</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Semi-Grade 1">Semi-Grade 1</option>
              <option value="Non-Standard">Non-Standard</option>
            </select>
          </div>
        </div>
      </div>

      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
              onPreviewImage={onPreviewImage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FFFDF6] rounded-2xl border border-dashed border-[#E0D8C3]">
          <p className="text-sm font-medium text-[#705E51]">No Sorcerer Collectibles matched your criteria.</p>
        </div>
      )}

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
  onViewDetails: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPreviewImage: PropTypes.func.isRequired,
};