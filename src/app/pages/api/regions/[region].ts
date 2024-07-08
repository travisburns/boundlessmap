import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region } = req.query;
  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, `${region}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error loading region data:', error);
    res.status(404).json({ message: 'Region not found' });
  }
}