import { NextResponse } from 'next/server';
import siruksvalleyData from '../../../data/siruksvalley.json';

export async function GET(request: Request, { params }: { params: { region: string } }) {
  const { region } = params;
  
  try {
    // Use the imported data instead of reading from file
    const data = region === 'siruksvalley' ? siruksvalleyData : null;
    
    if (!data) {
      throw new Error('Region not found');
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error loading region data:', error);
    return new NextResponse(JSON.stringify({ message: 'Region not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}