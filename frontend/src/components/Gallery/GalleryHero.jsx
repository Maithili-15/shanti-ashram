import { motion } from "framer-motion";

const GalleryHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="relative overflow-hidden px-6 py-16 md:py-28 md:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8 flex items-center gap-2 text-sm text-[#8B7355]"
          variants={itemVariants}
        >
          <a href="/" className="hover:text-[#c97325] transition-colors">
            Home
          </a>
          <span className="text-[#D4B5A0]">/</span>
          <span className="text-[#c97325] font-medium">Gallery</span>
        </motion.nav>

        {/* Title Section */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight text-[#1c1c19]">
            Sacred Moments
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#c97325] to-[#d9a574]" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-2xl text-lg text-[#5a3820] leading-relaxed font-light"
          variants={itemVariants}
        >
          A glimpse into the spiritual journey at Swami Hairchaitanya Shanti Ashram Trust. 
          Capturing moments of devotion, service, and divine grace through our daily life and celebrations.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              100+
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">Photos Captured</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              10+
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">Categories</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              365
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">Days of Seva</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GalleryHero;
