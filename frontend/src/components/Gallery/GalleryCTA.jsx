import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GalleryCTA = () => {
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
    <motion.section
      className="px-6 py-20 md:py-28 md:px-12 bg-gradient-to-br from-[#fcf9f4] to-[#f5ebe3]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1c1c19]">
              Share Your Experience
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[#c97325] to-[#d9a574]" />

            <p className="text-lg text-[#5a3820] leading-relaxed font-light">
              If you have captured beautiful moments at our ashram during seva, 
              celebrations, or spiritual gatherings, we'd love to feature them in our gallery.
            </p>

            <p className="text-base text-[#8B7355]">
              Your photos help us share the sacred essence of our community with the world. 
              Each image tells a story of devotion and grace.
            </p>

            <motion.div
              className="pt-4 space-y-3 sm:space-y-0 sm:flex gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="mailto:info@shantiashramtrust.org"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-[#c97325] text-white rounded-full font-medium hover:shadow-lg transition-all text-center"
              >
                Send Photos
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-white text-[#c97325] border border-[#c97325] rounded-full font-medium hover:bg-[#FFF5E6] transition-all text-center"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-4xl font-serif text-[#c97325] font-light mb-2">
                365
              </p>
              <p className="text-sm text-[#8B7355]">Days of Seva</p>
              <p className="text-xs text-[#D4B5A0] mt-2">Continuous service throughout the year</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-4xl font-serif text-[#c97325] font-light mb-2">
                10+
              </p>
              <p className="text-sm text-[#8B7355]">Locations</p>
              <p className="text-xs text-[#D4B5A0] mt-2">Ashram centers across India</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-4xl font-serif text-[#c97325] font-light mb-2">
                100K+
              </p>
              <p className="text-sm text-[#8B7355]">Devotees</p>
              <p className="text-xs text-[#D4B5A0] mt-2">Connected through our programs</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-4xl font-serif text-[#c97325] font-light mb-2">
                25+
              </p>
              <p className="text-sm text-[#8B7355]">Programs</p>
              <p className="text-xs text-[#D4B5A0] mt-2">Diverse spiritual activities</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default GalleryCTA;
