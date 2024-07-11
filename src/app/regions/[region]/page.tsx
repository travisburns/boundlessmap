import Home from '../../page';

interface RegionPageProps {
  params: {
    region: string;
  };
}

export default function RegionPage({ params }: RegionPageProps) {
  return <Home params={params} />;
}