import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

// Create a new instance of the cors middleware
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  const { region } = req.query;

  if (typeof region !== 'string') {
    return res.status(400).json({ message: 'Invalid region parameter' });
  }

  const dataDirectory = path.join(process.cwd(), 'src', 'app', 'data');
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