import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  loading,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  return (
    <motion.div
      className="py-12 px-6 md:px-12 border-t border-[#D4B5A0]"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-2xl">
        {/* Info */}
        <div className="mb-6 text-sm text-[#8B7355] text-center">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} images
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2">
          {/* Previous */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="p-2 rounded-lg border border-[#D4B5A0] text-[#8B7355] hover:bg-[#FFF5E6] hover:border-[#c97325] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          {visiblePages.map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`min-w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                page === currentPage
                  ? "bg-[#c97325] text-white shadow-md"
                  : "border border-[#D4B5A0] text-[#8B7355] hover:bg-[#FFF5E6] hover:border-[#c97325]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {page}
            </motion.button>
          ))}

          {totalPages > 3 && currentPage < totalPages - 1 && (
            <span className="text-[#8B7355]">...</span>
          )}

          {totalPages > 3 && currentPage < totalPages - 2 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(totalPages)}
              disabled={loading}
              className="min-w-10 h-10 rounded-lg font-medium text-sm border border-[#D4B5A0] text-[#8B7355] hover:bg-[#FFF5E6] hover:border-[#c97325] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {totalPages}
            </motion.button>
          )}

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="p-2 rounded-lg border border-[#D4B5A0] text-[#8B7355] hover:bg-[#FFF5E6] hover:border-[#c97325] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryPagination;
