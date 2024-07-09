import React, { useState } from 'react';
import { motion } from 'framer-motion';

import DonutChart from './DonutChart';
import ClassesChart from './ClassesChart';

interface Location {
  Name: string;
  id: string;
  description: string;
  XCoord: number;
  YCoord: number;
  image: string;
  region: string;
  type: string;
  stats: {
    population: number;
    magic: number;
    tech: number;
    money: number;
    governance: string;
    military: string;
    resource: string;
    peaceLevel: string;
  };
  geography: {
    climate: string;
    terrain: string[];
    resources: string[];
    landmarks: string[];
    waterFeatures: string[];
    vegetation: string[];
    geographicalFormations: string[];
    "flora and fauna": {
      plants: string[];
      animals: string[];
      insects: string[];
    };
  };
  species: Record<string, number>;
  classes: Record<string, number>;
  faction: Record<string, number>;
}



interface DetailsTabProps {
  location: Location;
  onClose: () => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ location, onClose }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderOverview = () => (
    <div className="space-y-6">
      <p className="text-2xl font-bold">{location.Name}</p>
      <p className="text-lg italic">{location.description}</p>
      <div className="w-full h-[30rem] overflow-hidden rounded-lg border-4 border-brown-600">
        <img
          src={location.image}
          alt={location.Name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(location.stats).map(([key, value]) => (
          <div key={key} className="bg-brown-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-brown-800 capitalize">{key}:</h3>
            <p className="text-lg">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGeography = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-brown-800">Geography</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Climate</h4>
          <p>{location.geography.climate}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Terrain</h4>
          <ul className="list-disc list-inside">
            {location.geography.terrain.map((terrain, index) => (
              <li key={index}>{terrain}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Resources</h4>
          <ul className="list-disc list-inside">
            {location.geography.resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Landmarks</h4>
          <ul className="list-disc list-inside">
            {location.geography.landmarks.map((landmark, index) => (
              <li key={index}>{landmark}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Water Features</h4>
          <ul className="list-disc list-inside">
            {location.geography.waterFeatures.map((waterFeature, index) => (
              <li key={index}>{waterFeature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Vegetation</h4>
          <ul className="list-disc list-inside">
            {location.geography.vegetation.map((vegetation, index) => (
              <li key={index}>{vegetation}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Geographical Formations</h4>
          <ul className="list-disc list-inside">
            {location.geography.geographicalFormations.map((formation, index) => (
              <li key={index}>{formation}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-2 text-brown-800">Flora and Fauna</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-lg font-semibold mb-1 text-brown-800">Plants</h5>
              <ul className="list-disc list-inside">
                {location.geography['flora and fauna'].plants.map((plant, index) => (
                  <li key={index}>{plant}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-1 text-brown-800">Animals</h5>
              <ul className="list-disc list-inside">
                {location.geography['flora and fauna'].animals.map((animal, index) => (
                  <li key={index}>{animal}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-1 text-brown-800">Insects</h5>
              <ul className="list-disc list-inside">
                {location.geography['flora and fauna'].insects.map((insect, index) => (
                  <li key={index}>{insect}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-brown-800">History</h3>
      {/* Render history content */}
    </div>
  );

  const renderCulture = () => (
    <div className="space-y-6">
      <div className="bg-brown-50 p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-4 text-brown-800">Species Demographics</h3>
        <DonutChart data={location.species} />
      </div>
      <div className="bg-brown-50 p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-4 text-brown-800">Class Distribution</h3>
        <ClassesChart data={location.classes} />
      </div>
    </div>
  );

  const renderFactions = () => (
    <div>
      {location.faction && (
        <div className="bg-brown-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4 text-brown-800">Faction Influence</h3>
          <ul className="divide-y divide-brown-300">
            {Object.entries(location.faction).map(([faction, influence]) => (
              <li key={faction} className="flex justify-between items-center py-2">
                <span className="text-lg">{faction}:</span>
                <span className="text-lg font-semibold">{influence}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverview();
      case 'Geography':
        return renderGeography();
      case 'History':
        return renderHistory();
      case 'Culture':
        return renderCulture();
      case 'Factions':
        return renderFactions();
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-parchment text-brown-900 p-6 h-full overflow-y-auto font-medieval"
      style={{
        backgroundImage: "url('/assets/parchment-bg.png')",
        backgroundSize: 'cover',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex justify-between items-center mb-6 border-b-2 border-brown-600 pb-4">
        <h2 className="text-3xl font-bold text-brown-800">{location.Name}</h2>
        <button onClick={onClose} className="text-brown-600 hover:text-brown-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mb-6">
        <ul className="flex border-b border-brown-300">
          {['Overview', 'Geography', 'History', 'Culture', 'Factions'].map((tab) => (
            <li
              key={tab}
              className={`mr-4 cursor-pointer py-2 px-4 ${
                activeTab === tab ? 'border-b-2 border-brown-600 font-semibold' : 'hover:bg-brown-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-8">
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default DetailsTab;
