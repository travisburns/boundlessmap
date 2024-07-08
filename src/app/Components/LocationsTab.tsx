import React from 'react';
import { motion } from 'framer-motion';

interface LocationsTabProps {
  locations: string[];
  visibleTypes: string[];
  onToggle: (type: string) => void;
  isVisible: boolean;
}

const LocationsTab: React.FC<LocationsTabProps> = ({ locations, visibleTypes, onToggle, isVisible }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 right-0 bg-gray-800 p-4 z-10"
    >
      <div className="flex flex-wrap gap-2">
        {locations.map(type => (
          <button
            key={type}
            className={`px-3 py-1 rounded ${
              visibleTypes.includes(type) ? 'bg-blue-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => onToggle(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default LocationsTab;