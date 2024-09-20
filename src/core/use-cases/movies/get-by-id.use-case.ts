import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBID } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { FullMovie } from '../../models/movie.model';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBID>(`/${movieId}`);
    const fullMovie = MovieMapper.fromMovieDBToFullMovie(movie);
    return fullMovie;
  } catch (error: any) {
    throw new Error('Error fetching movie - GetByIdMovie' + error.message);
  }
};
