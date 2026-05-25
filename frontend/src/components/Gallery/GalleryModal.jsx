import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const GalleryModal = ({ image, onClose, onPrevious, onNext, allImages = [] }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const getLocalizedText = (value) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const lang = document.documentElement.lang || "en";
      return value[lang] || value.en || "";
    }
    return "";
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  const handleDownload = useCallback(async () => {
    if (!image.url) return;
    setIsDownloading(true);

    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getLocalizedText(image.title) || "image.jpg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }, [image]);

  const currentIndex = allImages.findIndex((img) => img.id === image.id);
  const hasNext = currentIndex < allImages.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center overflow-auto rounded-2xl">
            <img
              src={image.url || image.src}
              alt={getLocalizedText(image.altText) || getLocalizedText(image.title)}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Info */}
          {(getLocalizedText(image.title) || image.category) && (
            <motion.div
              className="mt-4 p-4 bg-black/50 backdrop-blur rounded-xl text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {getLocalizedText(image.title) && (
                <h3 className="font-serif text-xl font-light mb-1">
                  {getLocalizedText(image.title)}
                </h3>
              )}
              {image.category && (
                <p className="text-sm text-gray-300 capitalize">
                  {typeof image.category === "string"
                    ? image.category
                    : getLocalizedText(image.category)}
                </p>
              )}
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="mt-4 flex items-center justify-between gap-2">
            {/* Image Counter */}
            <div className="text-white text-sm font-light">
              {currentIndex + 1} / {allImages.length}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Download */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-50"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </motion.button>

              {/* Previous */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrevious}
                disabled={!hasPrev}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous (← arrow key)"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                disabled={!hasNext}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next (→ arrow key)"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Close */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Empty space for alignment */}
            <div className="w-20" />
          </div>

          {/* Keyboard hints */}
          <div className="mt-3 text-center text-xs text-gray-400">
            Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200">Esc</kbd> to close,
            <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-200 ml-1">←→</kbd> to navigate
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;
