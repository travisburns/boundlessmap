'use client';
import { useParams } from 'next/navigation';
import Home from '../../page';

export default function RegionPage() {
  const params = useParams();
  return <Home params={{ region: params.region as string }} />;
}