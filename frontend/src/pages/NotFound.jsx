import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaceFrownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-9xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          404
        </motion.div>

        {/* Floating Icon */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center mb-8"
        >
          <FaceFrownIcon className="h-24 w-24 text-gray-400" />
        </motion.div>

        {/* Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          Oops! Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 mb-8"
        >
          The page you're looking for might have been moved or doesn't exist.
        </motion.p>

        {/* Return Home Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg 
                     hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/20"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Return to Homepage
          </Link>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: [0, -40, 0],
                x: Math.random() * 100 - 50
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute opacity-10"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to)`,
                borderRadius: '50%'
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;