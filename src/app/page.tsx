'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import LocationsTab from './Components/LocationsTab';
import DetailsTab from './Components/DetailsTab';
import DirectionArrow from './Components/DirectionArrow';
import AudioPlayer from './Components/AudioPlayer';
import { Location } from '../types/types';

const Map = dynamic(() => import('./Components/Map').then(mod => mod.default), { ssr: false });

interface RegionData {
  mapImage: string;
  audio: string;
  adjacentRegions: {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
  };
  regionOverview: {
    name: string;
    description: string;
    image: string;
    stats: {
      population: number;
      magic: number;
      tech: number;
      money: number;
    };
  };
  locations: Location[];
}

export default function Home({ params }: { params: { region?: string } }) {
  const router = useRouter();
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationsTabVisible, setIsLocationsTabVisible] = useState(false);
  const [showRegionTransition, setShowRegionTransition] = useState(false);
  const [nextRegion, setNextRegion] = useState<RegionData | null>(null);

  useEffect(() => {
    const fetchRegionData = async () => {
      setIsLoading(true);
      try {
        const regionName = params?.region || 'siruksvalley';
        const response = await fetch(`/api/regions/${regionName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch region data');
        }
        const data: RegionData = await response.json();
        setRegionData(data);
        const types = Array.from(new Set(data.locations.map((loc: Location) => loc.type)));
        setLocationTypes(types);
        setVisibleTypes(new Set(types));
      } catch (error) {
        console.error('Error fetching region data:', error);
      }
      setIsLoading(false);
    };

    fetchRegionData();
  }, [params.region]);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCloseDetails = () => {
    setSelectedLocation(null);
  };

  const handleToggleLocationType = (type: string) => {
    setVisibleTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const handleRegionTransition = async (direction: 'north' | 'south' | 'east' | 'west') => {
    if (regionData?.adjacentRegions[direction]) {
      try {
        const response = await fetch(`/api/regions/${regionData.adjacentRegions[direction]}`);
        if (!response.ok) {
          throw new Error('Failed to fetch next region data');
        }
        const data: RegionData = await response.json();
        setNextRegion(data);
        setShowRegionTransition(true);
      } catch (error) {
        console.error('Error fetching next region data:', error);
      }
    }
  };

  const startNewRegion = () => {
    if (nextRegion) {
      router.push(`/regions/${nextRegion.regionOverview.name.toLowerCase()}`);
      setShowRegionTransition(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen relative overflow-hidden">
      {regionData && <AudioPlayer audioSrc={regionData.audio} />}
      
      <div className="absolute inset-0 z-0">
        {regionData && (
          <Map
            mapImage={regionData.mapImage}
            locations={regionData.locations.filter(location => visibleTypes.has(location.type))}
            onMarkerClick={handleMarkerClick}
          />
        )}
      </div>

      {regionData && Object.entries(regionData.adjacentRegions).map(([direction, region]) => 
        region && (
          <DirectionArrow
            key={direction}
            direction={direction as 'north' | 'south' | 'east' | 'west'}
            onClick={() => handleRegionTransition(direction as 'north' | 'south' | 'east' | 'west')}
          />
        )
      )}
     
      <button 
        className="absolute bottom-4 left-4 z-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsLocationsTabVisible(!isLocationsTabVisible)}
      >
        {isLocationsTabVisible ? 'Hide Locations' : 'Show Locations'}
      </button>

      <LocationsTab
        locations={locationTypes}
        visibleTypes={Array.from(visibleTypes)}
        onToggle={handleToggleLocationType}
        isVisible={isLocationsTabVisible}
      />
     
      <AnimatePresence>
        {selectedLocation && (
          <div className="absolute top-0 right-0 h-full w-1/3 z-20">
            <DetailsTab
              location={selectedLocation}
              onClose={handleCloseDetails}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRegionTransition && nextRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="fixed inset-0 bg-cover bg-center" style={{backgroundImage: `url(${nextRegion.regionOverview.image})`}}>
  <div className="absolute inset-0 bg-black bg-opacity-60 overflow-auto">
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-5xl font-bold mb-4 text-center text-white">{nextRegion.regionOverview.name}</h2>
      <p className="text-xl mb-6 text-center text-gray-300">{nextRegion.regionOverview.overview}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {Object.entries(nextRegion.regionOverview).map(([key, value]) => {
          if (key !== 'name' && key !== 'overview' && key !== 'image' && key !== 'stats') {
            return (
              <div key={key} className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white mb-2 capitalize">{key}</h3>
                <p className="text-sm text-gray-300">{value}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {Object.entries(nextRegion.regionOverview.stats).map(([key, value]) => (
          <div key={key} className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold capitalize text-white mb-2">{key}</h3>
            <p className="text-xl font-bold text-green-500">{value}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={startNewRegion}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-2xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Enter {nextRegion.regionOverview.name}
        </button>
      </div>
    </div>
  </div>
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}