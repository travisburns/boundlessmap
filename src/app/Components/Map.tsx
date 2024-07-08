import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../types/types';

interface MapProps {
  mapImage: string;
  locations: Location[];
  onMarkerClick: (location: Location) => void;
}

const MapBounds = () => {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([-1, -1], [1, 1]);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });
  }, [map]);
  return null;
};

const Map: React.FC<MapProps> = ({ mapImage, locations, onMarkerClick }) => {
  const CustomIcon = (type: string) => {
    return L.icon({
      iconUrl: `/assets/${type}-icon.png`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={10.9}
      style={{ height: '100%', width: '100%' }}
      minZoom={10.9}
      maxZoom={18}
      zoomControl={false}
      attributionControl={false}
    >
      <ImageOverlay
        url={mapImage}
        bounds={[[-1, -1], [1, 1]]}
      />
      <MapBounds />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.YCoord, location.XCoord]}
          icon={CustomIcon(location.type)}
          eventHandlers={{
            click: () => onMarkerClick(location),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default Map;