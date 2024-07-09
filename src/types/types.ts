export interface Location {
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
