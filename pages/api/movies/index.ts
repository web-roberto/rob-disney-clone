import type { NextApiRequest, NextApiResponse } from 'next'
import { movieList } from '../../../database/db';
import { MovieListType } from '../../../types/MovieList';

type ResponseData = MovieListType[];
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('------------api/movies/index.tsx----------movieList----',movieList)
  res.status(200).json(movieList)
}