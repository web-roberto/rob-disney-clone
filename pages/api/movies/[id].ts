import type { NextApiRequest, NextApiResponse } from 'next'
import { MovieListType } from '../../../types/MovieList';
import { movieList } from '../../../database/db';


 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieListType>
) {
  const {id}=req.query;
  const filteredMovie=movieList?.filter(movie=> String(movie.id)===id)[0]
  res.status(200).json(filteredMovie);
}