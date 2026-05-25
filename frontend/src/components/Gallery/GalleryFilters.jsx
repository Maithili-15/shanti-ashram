import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";

const GalleryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  loading,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const handleClearSearch = useCallback(() => {
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <motion.div
      className="px-6 py-12 md:px-12 bg-gradient-to-b from-[#fcf9f4] to-transparent"
      variants={filterVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-2xl">
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          variants={filterVariants}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full px-4 py-3 pl-10 bg-white border border-[#D4B5A0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#c97325] focus:border-transparent transition-all"
              disabled={loading}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#c97325] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-sm font-medium text-[#8B7355] uppercase tracking-wider">
            Filter by Category
          </p>

          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
          >
            {["All", ...categories].map((category) => (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category.toLowerCase())}
                disabled={loading}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  (category === "All" ? activeCategory === "all" : activeCategory === category.toLowerCase())
                    ? "bg-[#c97325] text-white shadow-md hover:shadow-lg"
                    : "bg-white text-[#8B7355] border border-[#D4B5A0] hover:border-[#c97325] hover:text-[#c97325]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Active Filters Display */}
        {searchTerm && (
          <motion.div
            className="mt-6 p-4 bg-[#FFF5E6] border-l-4 border-[#c97325] rounded"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm text-[#8B7355]">
              Searching for: <span className="font-medium text-[#c97325]">"{searchTerm}"</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryFilters;
