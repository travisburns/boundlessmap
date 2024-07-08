// src/app/api/regions/[region]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { region: string } }
) {
  const { region } = params;
  const dataDirectory = path.join(process.cwd(), 'src', 'app', 'data');
  const regionName = region || 'SiruksValley';
  const filePath = path.join(dataDirectory, `${regionName}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading region data:', error);
    return NextResponse.json({ message: 'Region not found' }, { status: 404 });
  }
}