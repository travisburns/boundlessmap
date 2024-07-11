import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { region: string } }) {
  const { region } = params;
  const dataDirectory = path.join(process.cwd(), 'src', 'app', 'data');
  const filePath = path.join(dataDirectory, `${region}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Add CORS headers to the response
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    return new NextResponse(JSON.stringify(data), { headers });
  } catch (error) {
    console.error('Error loading region data:', error);
    return new NextResponse(JSON.stringify({ message: 'Region not found' }), { status: 404 });
  }
}