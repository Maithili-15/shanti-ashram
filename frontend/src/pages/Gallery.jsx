import { useState, useEffect, useCallback, useMemo } from "react";
import { useGallery } from "../context/GalleryContext";
import GalleryHero from "../components/Gallery/GalleryHero";
import GalleryFilters from "../components/Gallery/GalleryFilters";
import GalleryCard from "../components/Gallery/GalleryCard";
import GalleryModal from "../components/Gallery/GalleryModal";
import GalleryPagination from "../components/Gallery/GalleryPagination";
import GalleryCTA from "../components/Gallery/GalleryCTA";
import LoadingSkeleton from "../components/Gallery/LoadingSkeleton";
import EmptyState from "../components/Gallery/EmptyState";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const { galleryItems, galleryCategories, loading, error, fetchVisibleGallery } = useGallery();

  // UI State
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch gallery on mount
  useEffect(() => {
    fetchVisibleGallery();
  }, [fetchVisibleGallery]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    let result = galleryItems;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(
        (img) => {
          const imgCategory = (img.category || "").toLowerCase();
          const activeCat = activeCategory.toLowerCase();
          return imgCategory === activeCat || 
                 (img.categoryName || "").toLowerCase() === activeCat;
        }
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((img) => {
        const title = (typeof img.title === "string" ? img.title : img.title?.en || "").toLowerCase();
        const category = (typeof img.category === "string" ? img.category : img.category?.en || "").toLowerCase();
        const altText = (typeof img.altText === "string" ? img.altText : img.altText?.en || "").toLowerCase();

        return title.includes(term) || category.includes(term) || altText.includes(term);
      });
    }

    return result;
  }, [galleryItems, activeCategory, searchTerm]);

  // Paginate filtered images
  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredImages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredImages, currentPage]);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  // Get unique categories with proper capitalization
  const categories = useMemo(() => {
    const cats = new Set();
    galleryItems.forEach((img) => {
      const category = img.category || img.categoryName;
      if (category) {
        const categoryName = typeof category === "string" ? category : category.en || "";
        if (categoryName) {
          // Capitalize first letter of each word (including after hyphens)
          const properCaseName = categoryName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('-');
          cats.add(properCaseName);
        }
      }
    });
    return Array.from(cats).sort();
  }, [galleryItems]);

  // Navigation handlers
  const handlePreviousImage = useCallback(() => {
    const currentIndex = paginatedImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(paginatedImages[currentIndex - 1]);
    }
  }, [selectedImage, paginatedImages]);

  const handleNextImage = useCallback(() => {
    const currentIndex = paginatedImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < paginatedImages.length - 1) {
      setSelectedImage(paginatedImages[currentIndex + 1]);
    }
  }, [selectedImage, paginatedImages]);

  const handleResetFilters = useCallback(() => {
    setActiveCategory("all");
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <GalleryHero />

      {/* Filters Section */}
      <GalleryFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        loading={loading}
      />

      {/* Gallery Grid */}
      <section className="px-6 md:px-12 py-12">
        <div className="mx-auto max-w-screen-2xl">
          {error && (
            <motion.div
              className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Failed to load gallery: {error}
            </motion.div>
          )}

          {loading ? (
            <LoadingSkeleton count={ITEMS_PER_PAGE} variant="masonry" />
          ) : filteredImages.length === 0 ? (
            <EmptyState
              searchTerm={searchTerm}
              category={activeCategory}
              onReset={handleResetFilters}
            />
          ) : (
            <>
              {/* Grid */}
              <motion.div
                className="grid auto-rows-[280px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                layout
              >
                {paginatedImages.map((image, index) => (
                  <GalleryCard
                    key={image.id}
                    image={image}
                    index={index}
                    layout="masonry"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <GalleryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  loading={loading}
                  totalItems={filteredImages.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <GalleryCTA />

      {/* Image Modal */}
      {selectedImage && (
        <GalleryModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
          allImages={paginatedImages}
        />
      )}
    </>
  );
};

export default Gallery;
