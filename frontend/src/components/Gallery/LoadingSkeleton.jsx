import { motion } from "framer-motion";

const LoadingSkeleton = ({ count = 12, variant = "grid" }) => {
  const items = Array.from({ length: count });

  const shimmer = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-6 md:px-12">
        {items.map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-2xl bg-gradient-to-r from-[#E8DDD0] via-[#F5EFE7] to-[#E8DDD0] bg-[length:200%_200%]"
            variants={shimmer}
            animate="animate"
          />
        ))}
      </div>
    );
  }

  if (variant === "masonry") {
    return (
      <div className="grid auto-rows-[280px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-6 md:px-12">
        {items.map((_, i) => {
          const pattern = [
            "md:col-span-2 md:row-span-2",
            "md:col-span-1 md:row-span-1",
            "md:col-span-1 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-1 md:row-span-1",
            "md:col-span-1 md:row-span-1",
          ];
          
          return (
            <motion.div
              key={i}
              className={`rounded-2xl bg-gradient-to-r from-[#E8DDD0] via-[#F5EFE7] to-[#E8DDD0] bg-[length:200%_200%] ${pattern[i % pattern.length]}`}
              variants={shimmer}
              animate="animate"
            />
          );
        })}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
