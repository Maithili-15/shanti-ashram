import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

const EmptyState = ({ searchTerm, category, onReset }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="py-20 px-6 md:px-12 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <ImageOff className="w-16 h-16 mx-auto text-[#D4B5A0] opacity-50" />
      </motion.div>

      <motion.h3
        className="text-2xl font-serif font-light text-[#1c1c19] mb-2"
        variants={itemVariants}
      >
        No Images Found
      </motion.h3>

      <motion.p
        className="text-[#8B7355] max-w-md mx-auto mb-6"
        variants={itemVariants}
      >
        {searchTerm
          ? `We couldn't find any images matching "${searchTerm}"`
          : category !== "all"
          ? `No images in the ${category} category yet`
          : "No gallery images available yet"}
      </motion.p>

      {(searchTerm || category !== "all") && (
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-2 bg-[#c97325] text-white rounded-full font-medium hover:shadow-md transition-all"
          variants={itemVariants}
        >
          View All Images
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
