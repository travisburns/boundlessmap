// src/components/DirectionArrow.tsx
import { motion } from 'framer-motion';

interface DirectionArrowProps {
  direction: 'north' | 'south' | 'east' | 'west';
  onClick: () => void;
}

const DirectionArrow: React.FC<DirectionArrowProps> = ({ direction, onClick }) => {
  const rotationDegrees = {
    north: 0,
    east: 90,
    south: 180,
    west: 270,
  };

  return (
    <motion.div
      className={`absolute ${direction === 'north' ? 'top-4' : direction === 'south' ? 'bottom-4' : direction === 'east' ? 'right-4' : 'left-4'} ${direction === 'north' || direction === 'south' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white filter drop-shadow-lg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ transform: `rotate(${rotationDegrees[direction]}deg)` }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.div>
  );
};

export default DirectionArrow;