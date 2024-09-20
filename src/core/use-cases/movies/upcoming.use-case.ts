import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { GenericMovieDBResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../models/movie.model';

export const moviesUpcomingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const upComing = await fetcher.get<GenericMovieDBResponse>('/upcoming');
    return upComing.results.map(MovieMapper.fromMovieDBResultToModel);
  } catch (error: any) {
    throw new Error('Error fetching movies - upcoming' + error.message);
  }
};
